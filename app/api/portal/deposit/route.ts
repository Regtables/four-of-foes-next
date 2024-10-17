import axios from "axios";
import { NextResponse } from "next/server";

import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";

export const POST = async (req: Request) => {
  try {
    const orderId = await req.json();
    const client = await protect(req);

    if (client) {
      const {
        progress: { isDepositConfirmed },
      } = client!;

      if (isDepositConfirmed) {
        return new NextResponse("You have already paid your deposit", {
          status: 200,
        });
      }

      try {
        const payment = await axios.post(
          `${process.env.BASE_URL}/api/checkout/paypal/capture-paypal-payment`,
          orderId
        );
        const { status } = payment.data;

        if (status === "COMPLETED") {
          client!.progress.isDepositConfirmed = true;

          portalClient.createOrReplace(client);

          return new NextResponse(
            "Your depoist has been confirmed, thank you",
            { status: 200 }
          );
        }
      } catch (error) {
        console.log(error);
        return new NextResponse("There was a problem processing your payment");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
