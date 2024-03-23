import { createVerifcationToken, getVerificationToken } from "@/app/lib/actions/clients/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request){
  const { client, } = await request.json()
  try{
    const isVerified = await getVerificationToken()

    if(isVerified) {
      return NextResponse.json('User is already verified', { status: 400 })
    }

    await createVerifcationToken(client)

    return NextResponse.json('Verification token created', { status: 200 })
  } catch (error){
    console.log(error)

    return NextResponse.json(`Error verifying user: ${error}`, { status: 500 })
  } 
}

export async function DELETE(request: Request){
  
}