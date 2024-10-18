import { ClientType } from "@/types";
import React from "react";

const PortalVerification = ({ code, handleChange, client } : { code: string, handleChange: (e:string) => void, client: ClientType }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center w-[70%]">
        <h3 className="paragraph">A verification code has been sent to your email address, {client.email}</h3>
        <p className="paragraph mt-2"> 
          Please input the code down below to verify your identity and to
          continue to the Patron Lounge.
        </p>
      </div>

      <form className="w-full max-w-[200px]">
        <input
          maxLength={6}
          onChange={(e) => handleChange(e.target.value)}
          value={code}
          className="w-full bg-transparent border-[1px] border-white outline-none p-2 uppercase tracking-[0.3em] text-center"
        />
      </form>
    </div>
  );
};

export default PortalVerification;