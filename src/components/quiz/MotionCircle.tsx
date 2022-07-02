import { motion } from 'framer-motion';
import { useState } from 'react';

function MotionCircle() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <motion.svg width="50" height="50">
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="green"
        strokeWidth="3"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: isChecked ? 1 : 0,
          opacity: 1,
          // * 反向動畫
          scaleX: -1,
          rotate: -45,
        }}
        transition={{
          duration: 1,
          type: 'spring',
          bounce: 0,
        }}
      />
    </motion.svg>
  );
}

export default MotionCircle;
