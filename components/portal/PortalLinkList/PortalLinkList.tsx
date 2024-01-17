'use client'

import React from "react";

import { useModal } from "@/hooks/useModal";

import Partition from "./Partition";
import { LoungeLinkType } from "@/types";

interface PortalLinkListProps {
  links: LoungeLinkType[]
}

const PortalLinkList = ({ links } : PortalLinkListProps) => {
  const { handleOpen } = useModal()

  return (
    <nav className="flex flex-col items-center w-full">
      <Partition />

      {links.map((link, i) => (
        <button 
          key = {i}
          className="tracking-[0.5em] uppercase w-full active:bg-white active:text-black transition-colors rounded-sm text-white"
          onClick={() => handleOpen(link.type, { indemnity: link.data})}
        > 
          <div className="py-2 text-[9px] mx-auto text-center">{link.link}</div>

          {i !== links.length - 1 && (
            <div className="w-full">
              <Partition />
            </div>
          )}
        </button>
      ))}

      <Partition />
    </nav>
  );
};

export default PortalLinkList;
