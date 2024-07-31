'use server'

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { ClientType, SessionType } from "@/types";
import { fetchSanityClient } from "./fetchClient";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const jwtKey = new TextEncoder().encode(JWT_SECRET);

export const encrypt = async (payload: any, expiresIn: string) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(jwtKey);
};

export const decrypt = async (input: string): Promise<SessionType> => {
  try {
    const { payload } = await jwtVerify(input, jwtKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionType;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      // Token has expired
      console.error("JWT token has expired");
      throw error
    }
    // Handle other JWT verification errors
    console.error("Error verifying JWT token:", error);
    throw error;
  }
};

export const createSession = async (client: ClientType) => {
  try {
    const user = {
      name: client.clientName,
      email: client.email,
      id: client._id,
      isAppointmentCompleted: client.progress.isTattooCompleted,
    };
    const sessionExpires = new Date(Date.now() + 3600 * 1000);
    const reshreshExpires = new Date(Date.now() + 3600 * 2000);

    const session = await encrypt({ user, sessionExpires }, "1 hour");
    const refresh = await encrypt({ user, reshreshExpires }, "2 hours");

    cookies().set("session", session, {
      expires: sessionExpires,
      httpOnly: true,
    });
    cookies().set("session-refresh", refresh, {
      expires: reshreshExpires,
      httpOnly: true,
    });
  } catch (error) {
    console.log(`Error creating the session: ${error}`);

    throw error;
  }
};

export const getSession = async (req?: NextRequest) => {
  try {
    const session = cookies().get("session")?.value;

    if (!session) return null;
    const decoded = await decrypt(session);
    if (!decoded) {
      if (!req?.nextUrl.searchParams.has("redirected")) {
        const redirectUrl = new URL(`${req?.nextUrl.origin}/portal/auth/unauthorized`);
        redirectUrl.searchParams.set("redirected", "true");
        return NextResponse.redirect(redirectUrl);
      }
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

export const deleteSession = async () => {
  try {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("session-refresh", "", { expires: new Date(0) });
  } catch (error) {
    console.log(`Error deleting the session: ${error}`);
    throw error;
  }
};

export const updateSession = async (request: NextRequest) => {
  try {
    const session = request.cookies.get("session")?.value;
    const refresh = request.cookies.get("session-refresh")?.value;

    // if(!session || refresh){
    //   return NextResponse.redirect(`${request.nextUrl.origin}/portal/auth/unauthorized`)
    // }

    if (!session || !refresh) return;

    const decoded = await decrypt(session);
    const decodedRefresh = await decrypt(refresh);


    const client = await fetchSanityClient(decoded.user?.id);

    if (!client) {
      return NextResponse.json({ error: "Unable to fetch client data" }, { status: 401 });
    }

    decoded.user = {
      name: client.clientName,
      email: client.email,
      id: client._id,
      isAppointmentCompleted: client.progress.isTattooCompleted,
    };

    decoded.expires = new Date(Date.now() + 3600 * 1000);
    decodedRefresh.expires = new Date(Date.now() + 3600 * 1000 * 24);

    const newSession = await encrypt({ user: decoded.user, expires: decoded.expires }, "1 hour");
    const newRefresh = await encrypt({ user: decodedRefresh.user, expires: decodedRefresh.expires }, "2 hours");

    const res = NextResponse.next();

    res.cookies.set({
      name: "session",
      value: newSession,
      httpOnly: true,
      expires: decoded.expires as Date,
    });

    res.cookies.set({
      name: "session-refresh",
      value: newRefresh,
      httpOnly: true,
      expires: decodedRefresh.expires as Date,
    });

    return res;
  } catch (error) {
    console.log(`Error updating the session: ${error}`);

    throw error;
  }
};

export const createVerifcationToken = async (client: ClientType) => {
  try{
    console.log(client, 'client')
    if(!client) throw Error('No client')

    const user = {
      email: client.email
    }

    const verifiedExpires = new Date(Date.now() + 3600 * 1000 * 24 * 30);

    const verified = await encrypt({ user, verifiedExpires }, '30 days')

    cookies().set('verified', verified, {
      expires: verifiedExpires,
      httpOnly: true
    })

  } catch (error){
    console.log(`Error creating verification token: ${error}`)

    throw error
  }
}

export const getVerificationToken = async () => {
  try{
    const verified = cookies().get('verified')?.value
  
    if(!verified) return null
  
    const decoded = await decrypt(verified)

    return decoded
  } catch (error){
    console.log(`Error fetching verification token: ${error}`)

    throw error
  }
}

export const deleteVerificationToken = async () => {
  try{
    cookies().set('verified', '', { expires: new Date(0) })

  } catch (error){
    console.log(`Error when deleting verification token: ${error}`)

    throw error
  }
}