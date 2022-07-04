import { createStructuredSelector } from 'reselect';
import { motion, useAnimation, useCycle } from 'framer-motion';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import OptionBox from './OptionBox';
import QuestionBox from './QuestionBox';

const optionsVariants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2, duration: 1 },
  },
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 1,
    },
  },
};

const quizBoxSelector = createStructuredSelector({
  options: (state: RootState) => state.quiz.question.options,
  questionId: (state: RootState) => state.quiz.question.id,
});

let isFistQuestion = true;

function QuizBox() {
  const { options, questionId } = useAppSelector(quizBoxSelector);
  const controls = useAnimation();

  useEffect(() => {
    async function animation() {
      if (!isFistQuestion) {
        await controls.start('hidden');
      }
      await controls.start('visible');
    }
    // animation();

    if (isFistQuestion && questionId) {
      isFistQuestion = false;
    }
  }, [controls, questionId]);

  if (!questionId) {
    return <div />;
  }

  return (
    <div className="flex flex-col justify-start mt-5 relative">
      <QuestionBox />

      {options.length > 0 && (
        <motion.ul
          className="mt-5"
          animate={controls}
          variants={optionsVariants}
        >
          {options.map((option, index) => (
            <OptionBox key={index} option={option} index={index} />
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default QuizBox;
