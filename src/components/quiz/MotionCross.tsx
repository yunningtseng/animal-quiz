import { motion } from 'framer-motion';
import { useState } from 'react';

function MotionCross() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <motion.svg width="50" height="50">
      <motion.path
        d="M 10,10 L 40,40 M 40,10 L 10,40"
        fill="none"
        stroke="red"
        strokeWidth="3"
        animate={{
          pathLength: isChecked ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          type: 'spring',
          bounce: 0,
        }}
      />
      {/* <motion.line
      x1="10"
      y1="10"
      x2="40"
      y2="40"
      stroke="#00cc88"
      strokeWidth="3"
      animate={{
        pathLength: quiz.currentAnswer.includes(index) ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        type: 'spring',
        bounce: 0,
      }}
    />
    <motion.line
      x1="40"
      y1="10"
      x2="10"
      y2="40"
      stroke="#00cc88"
      strokeWidth="3"
      animate={{
        pathLength: quiz.currentAnswer.includes(index) ? 1 : 0,
      }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        type: 'spring',
        bounce: 0,
      }}
    /> */}
    </motion.svg>
  );
}

export default MotionCross;
