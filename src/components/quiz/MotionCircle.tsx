import { motion } from 'framer-motion';

interface Props {
  size: number;
}

function MotionCircle({ size }: Props) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 50 50">
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{
          pathLength: 0,

          scaleX: -1,
          rotate: -45,
        }}
        animate={{
          pathLength: 1,
          transitionEnd: {
            display: 'none',
          },
        }}
        transition={{
          duration: 1,

          type: 'spring',
        }}
      />
    </motion.svg>
  );
}

export default MotionCircle;
