import { NextResponse } from "next/server";

import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";

export async function POST(request: Request) {
  const formData = await request.formData();

  const image = formData.get("image") as File | null;
  const isAdmin = formData.get("isAdmin") === "true";
  const clientId = formData.get("clientId") as string;

  if (!image) {
    return NextResponse.json("No image found", { status: 400 });
  }

  if (isAdmin) {
    try {
      const asset = await portalClient.assets.upload("image", image);

      const message = {
        _type: "message",
        isFromClient: false,
        content: "",
        createdAt: new Date(),
        sender: undefined,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        _key: new Date(),
        isSent: true,
        hasError: false,
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

      return NextResponse.json({ message: newMessage }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(`Error when uploading image: ${error}`, {
        status: 500,
      });
    }
  } else {
    try {
      const client = await protect(request);

      if (client) {
        const asset = await portalClient.assets.upload("image", image);

        console.log(asset, "asset");

        const message = {
          _type: "message",
          isFromClient: true,
          content: "",
          createdAt: new Date(),
          sender: {
            _type: "reference",
            _ref: client._id,
          },
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
          readBy: [{ _type: "reference", _ref: client._id }],
          _key: new Date(),
          isSent: true,
          hasError: false,
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

        return NextResponse.json({ message: newMessage }, { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(`Error when uploading image: ${error}`, {
        status: 500,
      });
    }
  }
}
