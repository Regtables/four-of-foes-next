import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const { data } = body

    const {
      name,
      surname,
      email,
      contact,
      placement,
      city,
      instagram,
      dimention,
      experience,
      firstDate,
      secondDate,
      idea,
      artist,
      tourDate,
      reference1,
      reference2,
      reference3,
      reference4,
    } = data;

    const refs = [
      { filename: "reference1.jpg", content: reference1 },
      { filename: "reference2.jpg", content: reference2 },
      { filename: "reference3.jpg", content: reference3 },
      { filename: "reference4.jpg", content: reference4 },
    ];

    const references = refs.filter((ref) => ref.content !== null);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailData = await resend.emails.send({
      from: `${name} ${surname} <info@fouroffoes.com>`,
      to: ["info@fouroffoes.com"],
      subject: `Four of Foes Form Test New Online Booking Request from ${name} ${surname}`,
      reply_to: email,
      html: `<p>Hello Poets Corner,</p>
      <p>${name} ${surname} would like to make a booking with you, their details are:&nbsp;</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Name: </strong>${name} ${surname}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Email: </strong>${email}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Contact number: </strong>${contact}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>They live in:&nbsp;</strong>${city}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Instagram Handle:</strong>${instagram}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>Experience:&nbsp;</strong>${experience}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>Placement:&nbsp;</strong>${placement}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>Dimension: </strong>${dimention}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>First Date:&nbsp;</strong>${firstDate}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>Second Date:&nbsp;</strong>${secondDate}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Artist: </strong>${artist}</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>Tour City: </strong>${tourDate}</p>
      <p style="padding: 12px; border-left: 4px solid rgb(208, 208, 208); font-style: italic; text-align: left;"><strong>Idea:&nbsp;</strong>${idea}</p>
      <p>Please see their reference images attached.</p>
      <p>Best wishes</p>`,
      attachments: references,
    });

    return Response.json({ emailData });
  } catch (error: any) {
    console.log(error);

    return new NextResponse(`Internal Error ${error}` , { status: 500 })
  }
}
