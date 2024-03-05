"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { ClientType, SessionType } from "@/types";

const jwtKey = new TextEncoder().encode(process.env.JWT_KEY);

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 min from now")
    .sign(jwtKey);
};

export const decrypt = async (input: string): Promise<SessionType> => {
  const { payload } = await jwtVerify(input, jwtKey, { algorithms: ["HS256"] });

  return payload as unknown as SessionType;
};

export const createSession = async (client: ClientType) => {
  const user = { name: client.clientName, email: client.email, id: client._id };
  const expires = new Date(Date.now() + 10000);

  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
};

export const getSession = async () => {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  return await decrypt(session);
};

export const deleteSession = async () => {
  cookies().set("session", "", { expires: new Date(0) });
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;

  if (!session) return;

  const decoded = await decrypt(session);

  decoded.expires = new Date(Date.now() + 3600 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(decoded),
    httpOnly: true,
    expires: decoded.expires as Date
  });

  return res
};
