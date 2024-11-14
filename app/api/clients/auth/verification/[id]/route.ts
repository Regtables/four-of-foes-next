import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import axios from "axios";

import { portalClient } from "@/app/lib/sanity";
import { generateVerificationCode } from "@/app/lib/utils";
import { createVerifcationToken } from "@/app/lib/actions/clients/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const client = await portalClient.getDocument(id as string);

    if (client) {
      if(client.verification.isVerified) return NextResponse.json('Client is already verified', { status: 200 })

      if(!client.verification.isVerified && client.verification.verificationCode){
        await axios.delete(`${process.env.BASE_URL}/api/clients/auth/verification/${id}`)

        await GET(request, { params: { id } })

        return NextResponse.json("Verification code already created", {
          status: 400,
        });
      }

      if (
        !client.verifcation?.verifcationCode &&
        !client.verification?.isVerified
      ) {
        const code = generateVerificationCode();

        const salt = await bcrypt.genSalt(10);
        const hashedCode = await bcrypt.hash(code, salt);

        const clientVerificaton = {
          verificationCode: hashedCode,
          isVerified: false,
          verificationDate: null,
        };

        await portalClient
          .patch(id)
          .set({ verification: clientVerificaton })
          .commit();

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: `Four of Foes <info@fouroffoes.com>`,
          to: [client.email],
          subject: "Four of Foes Patron Lounge Verification Code",
          reply_to: "",
          html: `<p>Hello, ${client.clientName}</p>,
            <p>Your Patron Lounge verification code is:<strong>${code}</strong></p>
            <br />
            <p>Please use this code in order to access the lounge</p>

            <p>Best wishes</p>
          `,
        });

        return NextResponse.json("Verification code sent", { status: 200 });
      } else {

       
      }
    } else {
      return NextResponse.json("Client not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { code } = await request.json();

  try {
    const verificationData = await portalClient.fetch(
      `*[_type == "client" && _id == "${id}"]{verification{verificationCode}, email}`
    );

    const { verificationCode } = verificationData[0].verification;

    const isMatch = await bcrypt.compare(code, verificationCode);

    if (isMatch) {
      const clientVerificaton = {
        verificationCode: null,
        isVerified: true,
        verificationDate: new Date(),
      };

      await portalClient
        .patch(id as string)
        .set({ verification: clientVerificaton })
        .commit();

      await createVerifcationToken(verificationData[0]);

      return NextResponse.json("User verified", { status: 200 });
    } else {
      return NextResponse.json(
        "Entered code does not match verification code",
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try{
    const verification = {
      isVerified: false,
      verificationCode: '',
      verifcationDate: undefined
    }

    await portalClient.patch(id).set({ verification }).commit()

    return NextResponse.json('Verification was reset', { status: 200 })
  } catch (error){
    console.log(error)

    return NextResponse.json('Error when resetting verification')
  }
}
