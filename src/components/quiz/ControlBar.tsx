import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  confirmAnswer,
  endQuiz,
  nextQuestion,
  QuizState,
} from '../../store/quizSlice';

interface ControlBarProps {
  start: () => void;
  pause: () => void;
  reset: (offsetTimestamp?: Date, autoStart?: boolean) => void;
}

function ControlBar({ start, pause, reset }: ControlBarProps) {
  const navigate = useNavigate();
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  return (
    <div className="w-96 md:w-150 lg:w-225 flex mt-5 mx-auto justify-between">
      {quiz.checkAnswer && (
        <button
          type="button"
          onClick={() => {
            pause();
            dispatch(confirmAnswer());
          }}
        >
          確認
        </button>
      )}

      {!quiz.checkAnswer && quiz.qId < quiz.questionLength - 1 && (
        <button
          type="button"
          onClick={() => {
            start();
            dispatch(nextQuestion());
          }}
        >
          下一題
        </button>
      )}

      {!quiz.checkAnswer && quiz.qId === quiz.questionLength - 1 && (
        <button
          type="button"
          onClick={() => {
            reset();
            dispatch(endQuiz());
            navigate('/quiz-result');
          }}
        >
          作答結束
        </button>
      )}
    </div>
  );
}

export default ControlBar;
