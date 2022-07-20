import { motion } from 'framer-motion';
import { createStructuredSelector } from 'reselect';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleAnswer } from '../../store/quizSlice';
import { RootState } from '../../store/store';
import { Option } from '../../types/question';
import MotionCheckbox from './MotionCheckbox';

const quizSelector = (state: RootState) => state.quiz.currentAnswer;

interface OptionBoxProps {
  option: Option;
  index: number;
}

const optionVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function OptionBox({ option, index }: OptionBoxProps) {
  const dispatch = useAppDispatch();
  const currentAnswer = useAppSelector(quizSelector);
  const isChecked = currentAnswer.includes(index);

  return (
    <motion.li
      className="p-3 cursor-pointer border rounded-lg mt-5 flex"
      animate={{
        background: isChecked ? '#F0EBE3' : '#ffff',
      }}
      whileHover={{
        scale: 1.03,
        background: '#F0EBE3',
      }}
      whileTap={{ scale: 0.97 }}
      variants={optionVariants}
      onClick={() => {
        dispatch(toggleAnswer(index));
      }}
      aria-hidden="true"
    >
      <div>
        <MotionCheckbox index={index} size={30} />
      </div>

      <div className="max-w-72 sm:max-w-96 md:max-w-125 ml-3">
        <p>{option.name}</p>
        {option.pic === '' ? (
          <div />
        ) : (
          <img src={option.pic} alt="img" className="w-40" />
        )}
      </div>
    </motion.li>
  );
}

export default OptionBox;
