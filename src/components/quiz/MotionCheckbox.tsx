import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

const quizSelector = (state: RootState) => state.quiz.currentAnswer;

interface Props {
  index: number;
  size: number;
}

const boxStrokeColor = '#3d3d3d';

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 60 },
  pressed: { scale: 0.95, strokeWidth: 35 },
  checked: { stroke: boxStrokeColor },
  unchecked: { stroke: '#ddd', strokeWidth: 50 },
};

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

function MotionCheckbox({ index, size }: Props) {
  const currentAnswer = useAppSelector(quizSelector);
  const isChecked = currentAnswer.includes(index);

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
      whileHover="hover"
      whileTap="pressed"
      width={size}
      height={size}
      viewBox="0 0 440 440"
    >
      <motion.path
        d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
        fill="transparent"
        strokeWidth={50}
        stroke={boxStrokeColor}
        variants={boxVariants}
      />

      <motion.path
        d="M 0 128.666 L 128.658 257.373 L 341.808 0"
        transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
        fill="transparent"
        strokeWidth="65"
        stroke="#ffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        custom={isChecked}
      />

      <motion.path
        d="M 0 128.666 L 128.658 257.373 L 341.808 0"
        transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
        fill="transparent"
        strokeWidth="65"
        stroke="#2fa354"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        custom={isChecked}
      />
    </motion.svg>
  );
}

export default MotionCheckbox;
