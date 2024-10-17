import { portalClient } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Set the cutoff date to May 1, 2024
    const cutoffDate = new Date('2024-05-01T00:00:00Z');

    console.log(`Cutoff date: ${cutoffDate.toISOString()}`);

    // Fetch all message IDs created before the cutoff date
    const oldMessageIds = await portalClient.fetch(`
      *[_type == "message" && _createdAt < $cutoffDate]._id
    `, { cutoffDate: cutoffDate.toISOString() });

    console.log(`Found ${oldMessageIds.length} messages to delete.`);

    if (oldMessageIds.length === 0) {
      return NextResponse.json({ message: "No old messages found to delete." }, { status: 200 });
    }

    // Delete all old messages in a single transaction
    const transaction = portalClient.transaction();

    oldMessageIds.forEach((id: any) => {
      transaction.delete(id);
    });

    // Commit the transaction
    await transaction.commit();

    // Update all clients to remove references to deleted messages
    await portalClient
      .patch({
        query: '*[_type == "client"]'
      })
      .unset(['chat[_ref in $oldMessageIds]'])
      //@ts-ignore
      .commit({ oldMessageIds });

    return NextResponse.json({ 
      message: `Successfully deleted ${oldMessageIds.length} messages sent before May 2024 and updated client references.` 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in message cleanup process:", error);
    return NextResponse.json({ error: `Error in message cleanup process: ${error}` }, { status: 500 });
  }
}