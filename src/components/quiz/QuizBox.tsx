import { useAppSelector } from '../../hooks/redux';
import { Question } from '../../types/question';
import ControlBar from './ControlBar';
import OptionBox from './OptionBox';
import QuestionBox from './QuestionBox';

function QuizBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);

  return (
    <div className="w-md sm:w-lg lg:w-4xl mt-5">
      <QuestionBox />

      <div className="mt-5">
        {question.options.map((option, index) => (
          <OptionBox
            key={index}
            option={option}
            questionType={question.type}
            index={index}
          />
        ))}
      </div>

      <div className="mt-5">
        <ControlBar />
      </div>
    </div>
  );
}

export default QuizBox;
