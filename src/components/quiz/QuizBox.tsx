import { createStructuredSelector } from 'reselect';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import OptionBox from './OptionBox';
import QuestionBox from './QuestionBox';

const quizBoxSelector = createStructuredSelector({
  options: (state: RootState) => state.quiz.question.options,
  questionId: (state: RootState) => state.quiz.question.id,
});

function QuizBox() {
  const { options, questionId } = useAppSelector(quizBoxSelector);

  if (!questionId) {
    return <div />;
  }

  return (
    <div className="flex flex-col justify-start mt-5 relative">
      <QuestionBox />

      {options.length > 0 && (
        <motion.ul className="mt-5">
          {options.map((option, index) => (
            <OptionBox key={index} option={option} index={index} />
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default QuizBox;
