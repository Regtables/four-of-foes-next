import React, { ChangeEvent } from "react";

import { motion } from 'framer-motion'

interface InformationProps {
  informationData: {
    name: string,
    surname: string,
    email: string,
    contact: string,
    city: string
  },
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Information = ({ informationData, handleChange } : InformationProps) => {
  const inputStyles =
    "bg-transparent p-3 border-[1px] outline-none border-white rounded-sm w-full tracking-[0.1em] italic font-[var(--font-family)] font-light";

    const animationProps = {
      whileInView: { y: [-10, 0], opacity: [0,1]},
      transition: { duration: 1 }
    }
  return (
    <div className="flex flex-col gap-4">
      <motion.div { ...animationProps } transition={{delay: 0.1, duration: 0.5 }}>
        <input
          name="name"
          type="text"
          required = {true}
          value={informationData.name}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Name"
        />
      </motion.div>

      <motion.div { ...animationProps } transition={{delay: 0.2, duration: 0.5 }}>
        <input
          name="surname"
          type="text"
          required = {true}
          value={informationData.surname}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Surname"
        />
      </motion.div>

      <motion.div { ...animationProps } transition={{delay: 0.3, duration: 0.5 }}>
        <input
          name="email"
          type="email"
          required = {true}
          value={informationData.email}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Email"
        />
      </motion.div>

      
      <motion.div { ...animationProps } transition={{delay: 0.4, duration: 0.5 }}>
        <input
          name="contact"
          type="text"
          required = {true}
          value={informationData.contact}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Contact Number"
        />
      </motion.div>

      
      <motion.div { ...animationProps } transition={{delay: 0.5, duration: 0.5 }}>
        <input
          name="city"
          type="text"
          required = {true}
          value={informationData.city}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Homecity"
        />
      </motion.div>
    </div>
  );
};

export default Information;
