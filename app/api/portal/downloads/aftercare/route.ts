import path from "path";
import fs from 'fs'
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'studio5.jpeg');
    const fileName = 'poets cxrner aftercare guide.jpeg';

    const fileStream: Readable = fs.createReadStream(filePath);

    const headers = new Headers({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'image/jpeg',
    });

    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });

        fileStream.on('end', () => {
          controller.close();
        });

        fileStream.on('error', (err) => {
          controller.error(err);
        });
      },
    });

    return new NextResponse(readableStream, {
      headers,
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}