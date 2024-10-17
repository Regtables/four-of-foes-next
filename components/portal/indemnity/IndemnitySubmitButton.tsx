import React from 'react';
import { motion } from 'framer-motion';

import { useIndemnity } from '@/context/IndemnityContext';

import ButtonPill from '@/components/buttons/ButtonPill';

const IndemnitySubmitButton: React.FC = () => {
  const {
    isIndemnitySignReady,
    isIndemnitySigned,
    handleSubmit,
    handleRevokeClick,
  } = useIndemnity();

  return (
    <motion.div
      className="w-full h-[40px] mt-2"
      whileInView={{ y: [10, 0], opacity: [0, 1] }}
      transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
      initial={{ y: 10, opacity: 0 }}
      viewport={{ once: true }}
      onClick={isIndemnitySigned ? handleRevokeClick : handleSubmit}
    >
      <ButtonPill
        text={isIndemnitySigned ? 'revoke indemnity' : 'sign indemnity'}
        fill={isIndemnitySigned || (!isIndemnitySigned && isIndemnitySignReady) ? false : true}
      />
    </motion.div>
  );
};

export default IndemnitySubmitButton;