import * as paypal from '@/app/lib/paypal'
import { NextResponse } from "next/server";


export async function POST(req: Request){
  const body = await req.json()

  try{
    const { amount } = body

    const payment = await paypal.createOrder(amount)

    return NextResponse.json(payment)
  } catch (error){
    return new NextResponse('We could not proccess your payment', { status: 500 })
  }
}