import { createSession, decrypt } from "@/app/lib/actions/clients/auth";
import { fetchSanityClient } from "@/app/lib/actions/clients/fetchClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const refresh = cookies().get("session-refresh")?.value;

    if (!refresh) {
      return new NextResponse(JSON.stringify({ error: "No refresh token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = await decrypt(refresh);

    if (!decoded) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid refresh token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = await fetchSanityClient(decoded.user.id);

    if (!client) {
      return new NextResponse(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await createSession(client);

    return new NextResponse(JSON.stringify({ message: "Session refreshed" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error refreshing session:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
