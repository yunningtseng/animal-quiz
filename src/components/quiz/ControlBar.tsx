import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  confirmAnswer,
  endQuiz,
  QuizState,
  nextQuestion,
} from '../../store/quizSlice';

function ControlBar() {
  const navigate = useNavigate();
  const quizState: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  const quizTimeIsOver = quizState.mode === 'time-challenge' && quizState.quizIsOver;

  return (
    <div>
      {quizState.checkAnswer && !quizTimeIsOver && (
        <button
          type="button"
          className="w-40 tracking-[.5rem] text-lg font-bold border rounded-2xl px-3 py-2 bg-primary text-secondary hover:bg-dark hover:text-white"
          onClick={() => {
            dispatch(confirmAnswer());
          }}
        >
          確認
        </button>
      )}

      {!quizState.checkAnswer
        && !quizTimeIsOver
        && (quizState.mode === 'time-challenge'
          || quizState.qIdList.length < 10) && (
          <button
            type="button"
            className="w-40 tracking-[.5rem] text-lg font-bold border rounded-2xl px-3 py-2 bg-primary text-secondary hover:bg-dark hover:text-white"
            onClick={() => {
              dispatch(nextQuestion());
            }}
          >
            下一題
          </button>
      )}

      {((!quizState.checkAnswer
        && quizState.mode === 'normal'
        && quizState.qIdList.length === 10)
        || quizTimeIsOver) && (
        <button
          type="button"
          className="w-40 tracking-[.5rem] text-lg font-bold border rounded-2xl px-3 py-2 bg-primary text-secondary hover:bg-dark hover:text-white"
          onClick={() => {
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
