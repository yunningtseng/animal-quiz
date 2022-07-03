import { motion } from 'framer-motion';

interface MotionCircleProps {
  size: number;
}

function MotionCircle({ size }: MotionCircleProps) {
  return (
    // * viewBox: 截取畫面 左上 0,0，右下 50,50
    <motion.svg width={size} height={size} viewBox="0 0 50 50">
      <motion.circle
        // * cx cy 圓心點，r 半徑
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="green"
        strokeWidth="3"
        // * 線條兩端設定圓角
        strokeLinecap="round"
        initial={{
          pathLength: 0,
          // * 改逆時針
          scaleX: -1,
          rotate: -45,
        }}
        animate={{
          // * 總長度從 0 變到 1
          pathLength: 1,
          transitionEnd: {
            display: 'none',
          },
        }}
        transition={{
          duration: 1,
          // * 動畫效果
          type: 'spring',
        }}
      />
    </motion.svg>
  );
}

export default MotionCircle;
