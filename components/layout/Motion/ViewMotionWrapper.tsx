import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const ViewMotionWrapper = ({
  children,
  y = 20,
  x = 0,
  delay = 0,
  duration = 0.5,
  once = false,
  className,
  scale = 1,
  exit = { opacity: [1,0], duration: 0.5 },
}: {
  children: ReactNode;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  scale?: number;
  exit?: {};
}) => {
  return (
    <motion.div
      whileInView={{ y: [y, 0], x: [x, 0], opacity: [0, 1], scale: [scale, 1] }}
      transition={{ duration: duration, delay: delay }}
      initial={{ y: y, x: x, opacity: 0 }}
      viewport={{ once: once }}
      className={className}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default ViewMotionWrapper;
