import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = await protect(req);

    if (client) {
      const body = await req.json();

      const { currentRating: rating, feedback: review } = body;

      client.review = {
        rating: Number(rating),
        review,
      };
      
      client.progress.isReviewSubmitted = true;

      await portalClient.createOrReplace(client);

      return NextResponse.json("Your review has been submitted", {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("There was an issue with subitting your review", {
      status: 500,
    });
  }
}
