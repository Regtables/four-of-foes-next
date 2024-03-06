"use client";

import React from "react";
import { Asterisk } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import ButtonPill from "@/components/buttons/ButtonPill";

const PortalUnauthorized = ({ refreshable }: { refreshable: boolean }) => {
  const { logoutClient, refreshClientSession } = useAuth();

  return (
    <div className="border-4 border-[var(--color-gold)] w-[80%] flex flex-col items-center text-center gap-6 py-8 px-10 rounded-2xl my-auto">
      <h2 className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-bold heading-font">
        Unauthorized
      </h2>
      <Asterisk size={15} />

      <p className="text-center text-[12px] tracking-[0.15em]">
        Your session has expired/ended.
        {refreshable
          ? "Please choose to either remain logged out, or to refresh your session"
          : "Please refollow your unique Four of Foes Patron Lounge link"}
      </p>

      <div className="flex gap-4">
        <div className="min-w-[100px] min-h-[40px]" onClick={logoutClient}>
          <ButtonPill text="logout" />
        </div>

        {refreshable && (
          <div
            className="min-w-[100px] min-h-[40px]"
            onClick={refreshClientSession}
          >
            <ButtonPill text="refresh" fill />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalUnauthorized;
