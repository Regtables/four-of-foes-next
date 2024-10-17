import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import styles from "./AftercareAccordion.module.scss";
import { AftercareType } from "@/types";

const AftercareAccordionTile = ({
  item,
}: {
  item: AftercareType;
}) => {
  const { heading, content: instruction } = item;
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const content: any = useRef(null);
  const [animateIcon, setAnimateIcon] = useState({});

  const handleToggle = () => {
    setActive((prev) => !prev);

    if (!active) {
      setHeight(`${content.current.scrollHeight}px`);
      setAnimateIcon({ rotate: "180deg" });
    } else {
      setHeight("0px");
      setAnimateIcon({ rotate: "360deg" });
    }
  };

  return (
    <div
      className={styles.container}
      onClick={handleToggle}
      id={active ? styles.open : ""}
      style={active ? { borderRadius: "10px" } : {}}
    >
      <div className={styles.top}>
        <motion.div
          className={styles.icon}
          animate={animateIcon}
          transition={{ duration: 0.75 }}
        >
          <ChevronDown />
        </motion.div>

        <div className={styles.heading}>
          <h3>{heading}</h3>
        </div>
      </div>
      <div
        className={styles.content}
        style={{ maxHeight: height }}
        ref={content}
      >
        <p>{instruction}</p>
      </div>
    </div>
  );
};

export default AftercareAccordionTile;
