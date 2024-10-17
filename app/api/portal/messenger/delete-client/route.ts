import { portalClient } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { client } = await req.json();

    if (!client || !client._id) {
      return NextResponse.json({ error: "Invalid client data" }, { status: 400 });
    }

    // Fetch the messages that reference this client
    const clientMessages = await portalClient.fetch(
      `*[_type == "message" && sender._ref == $clientId]._id`,
      { clientId: client._id }
    );

    // Fetch messages without a sender reference
    const orphanedMessages = await portalClient.fetch(
      `*[_type == "message" && !defined(sender)]._id`
    );

    // Create a transaction to remove sender references
    const removeReferencesTransaction = portalClient.transaction();

    // Add each message update to the transaction
    clientMessages.forEach((messageId: string) => {
      removeReferencesTransaction.patch(messageId, (patch) => patch.unset(['sender']));
    });

    // Commit the transaction to remove references
    await removeReferencesTransaction.commit();

    // Clear the chat array in the client document
    await portalClient.patch(client._id).set({ chat: [] }).commit();

    // Create a transaction to delete all messages
    const deleteMessagesTransaction = portalClient.transaction();

    [...clientMessages, ...orphanedMessages].forEach((messageId: string) => {
      deleteMessagesTransaction.delete(messageId);
    });

    // Commit the transaction to delete messages
    await deleteMessagesTransaction.commit();

    // Finally, delete the client document
    await portalClient.delete(client._id);

    return NextResponse.json({ 
      message: `Removed references from ${clientMessages.length} messages, deleted ${clientMessages.length + orphanedMessages.length} messages (including ${orphanedMessages.length} orphaned messages), and deleted the client.` 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in cleanup process:", error);
    return NextResponse.json({ error: `Error in cleanup process: ${error}` }, { status: 500 });
  }
}