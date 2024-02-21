import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

const LINKS = [
  {
    link: "home",
    url: "/",
    disabled: false,
  },
  {
    link: "sculpture gallery",
    url: "/sculpture-gallery",
    disabled: true,
  },
  {
    link: "artist lookbook",
    url: "/artist-lookbook",
    disabled: true,
  },
  {
    link: "shop",
    url: "/shop",
    disabled: true,
  },
  {
    link: "about",
    url: "/about",
    disabled: true,
  },
  {
    link: "contact",
    url: "/contact",
    disabled: false,
  },
];

const NavMenu = () => {
  return (
    <div className="h-screen bg-black bg-opacity-80 w-[50vw] lg:w-[25vw] pt-10 pl-5">
      <div className="mt-14 flex flex-col gap-4">
        {LINKS.map((link, i) => (
          <motion.div
            whileInView={{ x: [-20, 0] }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            key={i}
          >
            <button
              className={cn(
                "uppercase text-[9px] tracking-[0.3em] font-light cursor-pointer hover:translate-x-3 transition-transform duration-500 disabled:text-[#a5a5a5]",
                link.disabled && "cursor-default hover:translate-x-0 font-[var(--font-family)]"
              )}
              disabled={link.disabled}
            >
              {link.disabled ? (
                <>
                  {link.link}
                </>
              ) : (
                <Link href={link.url}>
                  {link.link}
                </Link>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
