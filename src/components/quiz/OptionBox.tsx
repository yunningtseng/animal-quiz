import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { QuizState, toggleAnswer } from '../../store/quizSlice';
import { Option } from '../../types/question';
import MotionCheckbox from './MotionCheckbox';

interface OptionBoxProps {
  option: Option;
  index: number;
}

const inputType: { [key: string]: string } = {
  single: 'radio',
  multiple: 'checkbox',
  trueFalse: 'radio',
};

function OptionBox({ option, index }: OptionBoxProps) {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();
  const isChecked = quiz.currentAnswer.includes(index);

  return (
    <motion.li
      className="p-3 cursor-pointer border rounded-lg mt-5 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl flex"
      animate={{
        background: isChecked ? '#F0EBE3' : '#ffff',
      }}
      whileHover={{
        scale: 1.03,
        background: '#F0EBE3',
      }}
      whileTap={{ scale: 1 }}
      onClick={() => {
        dispatch(toggleAnswer(index));
      }}
      aria-hidden="true"
    >
      <MotionCheckbox index={index} size={30} />

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
