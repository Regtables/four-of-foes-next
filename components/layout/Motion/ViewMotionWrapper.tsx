import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const ViewMotionWrapper = ({
  children,
  y = 20,
  x = 0,
  delay = 0,
  duration = 0.5,
  once = false
} : {
  children: ReactNode
  y?: number,
  x?: number,
  delay?: number,
  duration?: number,
  once?: boolean
}) => {
  return (
    <motion.div
      whileInView={{ y: [y, 0], x: [x, 0], opacity: [0,1] }}
      transition={{ duration: duration, delay: delay }}
      // style={{ width: "100%" }}
      initial = {{y: y, x: x, opacity: 0}}
      viewport={{once: once}}
      className="motion_Wrapper"
    >
      {/* <div style={{width: '100%'}}> */}
        {children}
      {/* </div> */}
    </motion.div>
  );
};

export default ViewMotionWrapper;
