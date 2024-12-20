"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useSection } from "@/context/PortalSectionContext";
import { Message } from "@/types";
import { readMessages } from "@/app/lib/actions/messages/messagesApi";
import { usePortalProgress } from "@/context/PortalProgressContext";
import { smoothScroll } from "@/app/lib/utils";

const LINKS = [{ link: "lobby" }, { link: "lounge" }, { link: "wallet" }];

const PortalNavbar = ({ unreadMessages:messages } : { unreadMessages: Message[] }) => {
  const { currentSection } = useSection();
  const [unreadMessages, setUnreadMessages] = useState(messages)
  const [animateDot, setAnimateDot] = useState({});
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { progress: { isDepositConfirmed } } = usePortalProgress()

  console.log(unreadMessages)

  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollIntoView({ behavior: 'instant'});
  //   }
  // }, []);

  useEffect(() => {
    const activeLinkIndex = LINKS.findIndex(
      (link) => link.link === currentSection
    );
    if (activeLinkIndex !== -1) {
      const activeLinkWrapper = linkRefs.current[activeLinkIndex];
      const { left, width } = activeLinkWrapper!.getBoundingClientRect();
      const containerLeft =
        activeLinkWrapper!.parentElement!.getBoundingClientRect().left;
      const dotLeft = left - containerLeft + width / 2 - 5;
      setAnimateDot({ left: dotLeft });
    }

    if(currentSection === 'lobby'){
      if(isDepositConfirmed && unreadMessages){
        setTimeout(() => {
          setUnreadMessages([])
          readMessages(unreadMessages, false)
        }, 2000);
      }
    }
  }, [currentSection]);

  return (
    <div className="grid grid-cols-3 gap-8 w-full h-full relative justify-center lg:pb-0" ref={containerRef}>
      {LINKS.map((link, i) => (
        <div
          className="link-wrapper flex justify-center"
          ref={(el) => (linkRefs.current[i] = el)}
          key={i}
        >
          <a
            className="uppercase text-[11px] tracking-[0.2em] flex flex-col items-center justify-center relative cursor-pointer"
            // href={`#${link.link}`}
            onClick={() => smoothScroll(link.link)}
          >
            {link.link}
          </a>

          <motion.div
            className="h-2 w-2 bg-[grey] rounded-full absolute lg:bottom-[-15px] bottom-[-18px] mr-[1px]"
            whileInView={{ opacity: [0,1], transition: { duration: 2, delay: 1 } }}
            initial = {{ opacity: 0 }}
            animate={animateDot}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />

          {link.link === 'lobby' && currentSection !== 'lobby' && unreadMessages?.length > 0 && (
            <div className="absolute h-[18px] w-[18px] bg-[#444444] mx-auto rounded-full text-[8px] flex items-center justify-center lg:bottom-[-22px] bottom-[-22px]">
              {unreadMessages.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortalNavbar;
