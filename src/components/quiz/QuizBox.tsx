import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/redux';
import { Question } from '../../types/question';
import OptionBox from './OptionBox';
import QuestionBox from './QuestionBox';

const variants = {
  open: {
    transition: { staggerChildren: 1, delayChildren: 15 },
  },
  closed: {
    // transition: {
    //   staggerChildren: 0.05,
    //   staggerDirection: -1,
    // },
  },
};

function QuizBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);

  return (
    <div className="mt-5">
      <QuestionBox />

      {question.options.length > 0 && (
        <motion.ul
          className="mt-5"
          animate={question.options.length > 0 ? 'open' : 'closed'}
          variants={variants}
        >
          {question.options.map((option, index) => (
            <OptionBox key={index} option={option} index={index} />
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default QuizBox;
