import React from "react";

import PortalUnauthorized from "@/components/portal/sections/PortalUnAuthorized";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/actions/clients/auth";

const UnauthorizedPage = async () => {
  const session = await getSession();
  const isRefreshable = cookies().get("session-refresh")?.value ? true : false;

  if (session) return redirect("/portal/pre");

  return (
    <div className="h-full w-full flex justify-center items-center">
      <PortalUnauthorized refreshable={isRefreshable} />
    </div>
  );
};

export default UnauthorizedPage;
