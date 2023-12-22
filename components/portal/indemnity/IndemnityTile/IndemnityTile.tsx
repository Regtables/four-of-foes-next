import React, { useState, useRef } from "react";
import { ChevronUp, Check } from 'lucide-react'

import styles from "./IndemnityTile.module.scss";
import { IndemnityType, MiniIndemnityClauseType } from "@/types";
import MiniIndemnityClause from "../MiniIndemnityClause/MiniIndemnityClause";

const IndemnityTile = ({
  indemnity,
  handleCheck,
  miniClauses,
  handleMiniClauseCheck,
}: {
  indemnity: IndemnityType;
  handleCheck: any;
  miniClauses?: MiniIndemnityClauseType[]
  handleMiniClauseCheck?: any;
}) => {
  const { heading, clause, id, consentGiven } = indemnity;
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [checked, setChecked] = useState(consentGiven);
  const content: any = useRef(null);

  const handleToggle = () => {
    setActive((prev) => !prev);
    const element = document.getElementById(id);

    if (!active) {
      element?.classList.add(styles.active_phase_1);

      setTimeout(() => {
        setHeight(`${content.current!.scrollHeight}px`);
      }, 300);
    } else {
      element?.classList.remove(styles.active_phase_1);
      setHeight("0px");
    }
  };

  const handleCheckClick = () => {
    handleCheck(id);

    setChecked((prev) => !prev);
    const element = document.getElementById(id);

    if (!consentGiven) {
      element?.classList.add(styles.checked);
    } else {
      element?.classList.remove(styles.checked);
    }

    if (active) {
      handleToggle();
    }
  };

  return (
    <div className={styles.container} id={id}>
      <div className={styles.top}>
        <div className={styles.heading} onClick={handleToggle}>
          <div
            className={styles.open}
            style={active ? { transform: "rotate(180deg)" } : {}}
          >
            <ChevronUp />
          </div>

          <h3>{heading}</h3>
        </div>

        <div className={styles.checkbox} onClick={handleCheckClick}>
          {consentGiven && <Check />}
        </div>
      </div>
      <div
        className={styles.clause}
        style={{ maxHeight: height, opacity: 1 }}
        ref={content}
      >
        <p>{clause}</p>

        {id === "health" && (
          <div className={styles.miniClauses}>
            {miniClauses?.map((cla,i) => (
              <MiniIndemnityClause clause={cla} handleCheck={handleMiniClauseCheck} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndemnityTile;
