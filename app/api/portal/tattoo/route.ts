import axios from "axios";
import { NextResponse } from "next/server";

import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";

export const POST = async (req: Request) => {
  try {
    const orderId = await req.json();
    const client = await protect(req);

    const {
      progress: { isPaymentConfirmed },
    } = client!;

    if(client){
      if (isPaymentConfirmed) {
        return new NextResponse("You have already paid for your tattoo", {
          status: 500,
        });
      }
  
      try {
        const payment = await axios.post(
          `${process.env.BASE_URL}/api/checkout/paypal/capture-paypal-payment`,orderId
        );
        const { status } = payment.data;
  
        if (status === "COMPLETED") {
          client!.progress.isPaymentConfirmed = true;
  
          portalClient.createOrReplace(client);
  
          return new NextResponse('Your Tattoo Payment has been confirmed, thank you', { status: 200 })
        }
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error });
      }

    }

  } catch (error) {
    console.log(error);
  }
};
