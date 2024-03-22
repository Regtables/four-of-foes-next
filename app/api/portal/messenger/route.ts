import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";
import { Message } from "@/types";

export async function POST(req: Request) {
  const { content, isAdmin, clientId } = await req.json();

  if (isAdmin) {
    try {
      const user = await currentUser();

      if (user) {
        const message = {
          _type: "message",
          content,
          createdAt: new Date(),
          sender: undefined,
          isSent: true,
          hasError: false,
          isFromClient: false,
          readBy: ["admin"],
          _key: new Date(),
        };

        const newMessage = await portalClient.create(message);

        const newMessageRef = {
          _type: "reference",
          _ref: newMessage._id,
          _key: new Date(),
        };

        await portalClient
          .patch(clientId)
          .setIfMissing({ chat: [] })
          .append("chat", [newMessageRef])
          .commit();

        return NextResponse.json({ message }, { status: 200 });
      } else {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
    } catch (error) {
      console.log(error);

      return NextResponse.json(`Error sending message: ${error}`, {
        status: 500,
      });
    }
  } else {
    try {
      const client = await protect(req);

      if (client) {
        const message = {
          _type: "message",
          content,
          createdAt: new Date(),
          sender: {
            _type: "reference",
            _ref: client._id,
          },
          isSent: true,
          hasError: false,
          isFromClient: true,
          _key: new Date(),
          readBy: ['client'],
        };

        const newMessage = await portalClient.create(message);

        const newMessageRef = {
          _type: "reference",
          _ref: newMessage._id,
          _key: new Date(),
        };

        await portalClient
          .patch(client._id)
          .setIfMissing({ chat: [] })
          .append("chat", [newMessageRef])
          .commit();

        console.log(newMessage);

        return NextResponse.json({ message }, { status: 200 });
      }
    } catch (error) {
      console.log(error);

      return NextResponse.json(`Error sending message: ${error}`, {
        status: 500,
      });
    }
  }
}
