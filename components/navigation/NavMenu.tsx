import React from "react";
import { motion } from "framer-motion";

const LINKS = [
  {
    link: "home",
    url: "/",
  },
  {
    link: "sculpture gallery",
    url: "/sculpture-gallery",
  },
  {
    link: "artist lookbook",
    url: "/artist-lookbook",
  },
  {
    link: "shop",
    url: "/shop",
  },
  {
    link: "about",
    url: "/about",
  },
  {
    link: "contact",
    url: "/contact",
  },
];

const NavMenu = () => {
  return (
    <div className="h-screen bg-black bg-opacity-80 w-[50vw] lg:w-[25vw] pt-10 pl-5">
      <div className="mt-14 flex flex-col gap-6">
        {LINKS.map((link, i) => (
          <motion.div whileInView={{ x: [-20, 0]}} transition={{ delay: 0.1*i, duration: 0.3 }} key={i}>
            <h3 className="uppercase text-[9px] tracking-[0.3em] font-light cursor-pointer hover:translate-x-3 transition-transform duration-500">
              {link.link}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
