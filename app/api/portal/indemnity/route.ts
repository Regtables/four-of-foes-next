import { portalClient } from "@/app/lib/sanity";
import { protect } from "@/middleware/authMiddleware";
import { IndemnityType, MiniIndemnityClauseType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const { indemnityClauses, miniIndemnityClauses } = await req.json()

    const client = await protect(req)

    if(client){
      const { progress: { isIndemnitySigned } } = client

      const clientIndemnity = {
        captureDate: new Date(),
        clientName: client.clientName,
        agreedMainClauses: indemnityClauses,
        agreedIndividualClauses: miniIndemnityClauses
      }
      
      client.clientIndemnity = clientIndemnity
      client.progress.isIndemnitySigned = true

      await portalClient.createOrReplace(client)

      return NextResponse.json('Successfully captured indemnity', { status: 200 })
    } else {
      return NextResponse.json({ error: 'Unauthorized' } , { status: 401 })
    }
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: `Error when signing indemnity: ${error}` }, { status: 500 })
  }
}

export async function DELETE(req: Request){
  try{
    const client = await protect(req)

    if(client){
      const clientIndemnity = {
        captureDate: '',
        clientName: '',
        agreedMainClauses: [] as IndemnityType[],
        agreedIndividualClauses: [] as MiniIndemnityClauseType[]
      }

      client.clientIndemnity = clientIndemnity
      client.progress.isIndemnitySigned = false

      await portalClient.createOrReplace(client)

      return NextResponse.json('Indemnity revoked', { status: 200 })
    }
  } catch (error){  
    console.log(error)

    return NextResponse.json(`Error when reseting client indemnity: ${error}`, { status: 500 })
  }
}