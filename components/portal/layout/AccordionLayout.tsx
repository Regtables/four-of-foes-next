import { cn } from "@/app/lib/utils";
import Popup from "@/components/layout/Popup";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";

const AccordionLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState("0px");
  const content: any = useRef(null);

  const handleToggle = () => {
    if (!toggle) {
      setToggle(true);
      setHeight(`100vh`);
    } else {
      setToggle(false);
      setHeight("0px");
    }
  };

  return (
    // <Popup isOpen = {toggle}>
    <div
      className={cn(
        "w-full p-1 transition-all duration-[2s]",
        toggle && "py-4 px-0 z-20"
      )}
    >
      <button
        className={cn(
          "text-white text-[10px] text-center cursor-pointer tracking-[0.5em] uppercase w-full active:text-black transition-colors rounded-sm ",
          toggle && " relative z-10"
        )}
        onClick={handleToggle}
      >
        {title}
      </button>

      <div
        ref={content}
        style={{ maxHeight: height }}
        className={cn(
          "overflow-hidden transition-all duration-[0.7s] flex justify-center w-full relative z-10 mb-auto h-[65vh]",
          toggle && "relative z-10"
        )}
      >
        {children}
      </div>

      <AnimatePresence>
        {toggle && (
          <>
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1.2 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              className="fixed top-0 bottom-0 start-0 end-0 h-screen w-screen bg-black/90"
            />
          </>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {toggle && (
            <motion.div
                className="bg-white h-7 w-7 flex justify-center items-center start-[50%] rounded-full cursor-pointer absolute bottom-0 mx-auto z-100"
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 1, delay: 0.3 }}
                initial = {{y: 20, opacity: 0 }}
                exit={{ y: [0, 20], opacity: [1,0] }}
                onClick={handleToggle}
              >
                <X color="black" size={15} />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
    // </Popup>
  );
};

export default AccordionLayout;
