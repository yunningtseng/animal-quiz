import { useAppSelector } from '../../hooks/redux';
import { Question } from '../../types/question';
import ControlBar from './ControlBar';
import OptionBox from './OptionBox';
import QuestionBox from './QuestionBox';

function QuizBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);

  return (
    <div>
      <QuestionBox />

      <div className="flex flex-wrap">
        {question.options.map((option, index) => (
          <OptionBox key={index} option={option} questionType={question.type} />
        ))}
      </div>

      <ControlBar />
    </div>
  );
}

export default QuizBox;
