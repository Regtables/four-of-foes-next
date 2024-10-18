import { portalClient } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { client } = await req.json();

    if (!client || !client._id) {
      return NextResponse.json({ error: "Invalid client data" }, { status: 400 });
    }

    const messageIds = client.chat

    console.log(messageIds, 'messages to delete')

    const deleteMessagesTransaction = portalClient.transaction()

    await portalClient.patch(client._id).set({ chat: [] }).commit()

    messageIds.forEach((messageId: any) => {
      deleteMessagesTransaction.delete(messageId._ref)
    })

    await deleteMessagesTransaction.commit()

    await portalClient.delete(client._id);

    return NextResponse.json({ 
      message: `Removed message references and deleted the client` 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in cleanup process:", error);
    return NextResponse.json({ error: `Error in cleanup process: ${error}` }, { status: 500 });
  }
}