'use client'

import React from "react";
import { Search } from "lucide-react";

const MessengerChatSearch = ({ searchTerm, setSearchTerm } : { searchTerm: string, setSearchTerm: (term: string) => void }) => {
  return (
    <div className="flex bg-white p-1 px-2 rounded-full gap-2 items-center">
      <Search color="grey" size={15} />

      <input
        className="bg-transparent text-[12px] h-[25px] w-full text-black focus:none border-none outline-none italic"
        placeholder="Search for a client"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default MessengerChatSearch;
