import path from "path";
import fs from 'fs'
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse){
  try{
    const filePath = path.join(process.cwd(), 'public', 'studio5.jpeg')
    const fileName = 'poets cxrner aftercare guide.jpeg'

    const fileStream = fs.createReadStream(filePath)

    new NextResponse().headers.append('Content-Disposition', `attachment; filename="${fileName}"`);
    new NextResponse().headers.append('Content-Type', 'image/jpeg');

    fileStream.on('error', (error: any) => {
      console.error('Error reading file:', error);
      return new NextResponse(error, { status: 500 })
    });

    fileStream.on('end', () => {
      return new NextResponse('', { status: 200 })
    })

    fileStream.pipe(res)

  } catch (error){
    console.log(error)
  }
}