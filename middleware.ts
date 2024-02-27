import { NextRequest } from "next/server";
import { updateSession } from "./app/lib/actions/clients/auth";

export default async function middleware(request: NextRequest){
  return updateSession(request)
}