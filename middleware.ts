import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { getSession, updateSession } from "./app/lib/actions/clients/auth";

export default authMiddleware({
  beforeAuth: async (req: NextRequest) => {
    const session = await getSession(req);
    if (!session) {
      // If there's no session, redirect to the unauthorized page
      return;
    }

    const response = await updateSession(req);
    if (response instanceof NextResponse) {
      // If the response from updateSession is a NextResponse
      if (response.status === 401) {
        // If the status code is 401 (Unauthorized), return the response
        return response;
      } else if (response.headers.has("Location")) {
        // If the response includes a "Location" header (for redirection)
        return response;
      }
    }

    // If no special handling is required, continue to the next middleware or route
    return response || NextResponse.next();
  },
  publicRoutes: ["/api/trpc/(.*)", "/portal/messenger-dashboard/auth"],
  afterAuth: (auth, req: NextRequest, evt) => {
    if (!auth.userId && req.nextUrl.pathname.startsWith("/portal/messenger-dashboard")) {
      const signInUrl = new URL("/login", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/portal/:path*", "/api/portal/messenger/:path"],
};