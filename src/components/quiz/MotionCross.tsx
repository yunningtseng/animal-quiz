import { motion } from 'framer-motion';

interface MotionCrossProps {
  size: number;
}

function MotionCross({ size }: MotionCrossProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      stroke="red"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <motion.line
        x1="10"
        y1="10"
        x2="40"
        y2="40"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: [0, 1, 1, 1, 1],
          opacity: [0, 1, 1, 1, 0],
          transitionEnd: {
            display: 'none',
          },
        }}
        transition={{
          duration: 1.5,
          type: 'spring',
        }}
      />
      <motion.line
        x1="40"
        y1="10"
        x2="10"
        y2="40"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: [0, 0, 1, 1, 1],
          opacity: [0, 0, 1, 1, 0],
          transitionEnd: {
            display: 'none',
          },
        }}
        transition={{
          duration: 1.5,
          type: 'spring',
        }}
      />
    </motion.svg>
  );
}

export default MotionCross;
