// app/api/upload/route.ts
import { createReadStream } from 'fs';
import { basename } from 'path';
import { NextResponse } from 'next/server';
import { portalClient } from '@/app/lib/sanity';
import { protect } from '@/middleware/authMiddleware';
import multiparty from 'multiparty';
import { Readable } from 'stream';

export async function POST(request: Request) {
  try {
    const client = await protect(request);
    if (client) {
      const formData = await request.formData()

      const image = formData.get('image') as File | null

      console.log(image)

      if(!image ){
        return NextResponse.json('No image found', { status: 400 })
      }
      // const form = new multiparty.Form();

      // const formData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      //   form.parse(request, (err, fields, files) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve({ fields, files });
      //     }
      //   });
      // });

      // const { fields, files } = formData;
      // const image = files.image[0];
      const arrayBuffer = await image.arrayBuffer()
      const stream = Readable.from(Buffer.from(arrayBuffer))

      const path = 'C:/Users/DELL/Desktop/Websites/Work/four-of-foes/four-of-foes-next/public/landing-bg.jpeg'

      console.log(stream, 'stream')

      const filename = basename(image.name);

      const asset = await portalClient.assets.upload('image', createReadStream(path), { filename: basename(path) });

      console.log(asset, 'asset')

      const message = {
        _type: 'message',
        isFromClient: true,
        content: '',
        createdAt: new Date(),
        sender: {
          _type: 'reference',
          _ref: client._id,
        },
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        readBy: [{ _type: 'reference', _ref: client._id }],
        _key: client.chat.length + 1,
      };

      await portalClient
        .patch(client._id)  
        .setIfMissing({ chat: [] })
        .append('chat', [message])
        .commit();

      return NextResponse.json('Image uploaded', { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(`Error when uploading image: ${error}`, { status: 500 });
  }
}