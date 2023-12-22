import React from "react";
import { motion } from "framer-motion";

const AnimateMotionWrapper = ({
  children,
  animate,
  duration = 0.5,
  delay = 0,
}: {
  children: any;
  animate: any;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: duration, delay: delay }}
      initial = {{opacity: 0}}
    >
      {children}
    </motion.div>
  );
};

export default AnimateMotionWrapper;
