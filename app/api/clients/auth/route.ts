import { createSession, getSession } from "@/app/lib/actions/clients/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const signedInClient:any = await getSession()

    const { client } = body;

    if (!client) {
      return NextResponse.json(
        { error: "Missing client information" },
        { status: 400 }
      );
    }

    await createSession(client);

    return NextResponse.json({ message: "User logged in" }, { status: 200 });
  } catch (error) {
    console.error("Error during user sign-in:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "An error occurred during user sign-in", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred during user sign-in" },
      { status: 500 }
    );
  }
}