import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  confirmAnswer,
  endQuiz,
  setQuestion,
  QuizState,
} from '../../store/quizSlice';

function ControlBar() {
  const navigate = useNavigate();
  const quizState: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  return (
    <div className="w-96 md:w-150 lg:w-225 flex mt-3 mx-auto justify-between">
      {quizState.checkAnswer && (
        <button
          type="button"
          onClick={() => {
            dispatch(confirmAnswer());
          }}
        >
          確認
        </button>
      )}

      {!quizState.checkAnswer && quizState.qId < quizState.questionLength - 1 && (
        <button
          type="button"
          onClick={() => {
            // TODO nextQuestionX
            // dispatch(nextQuestionX());
            dispatch(setQuestion());
          }}
        >
          下一題
        </button>
      )}

      {!quizState.checkAnswer
        && quizState.qId === quizState.questionLength - 1 && (
          <button
            type="button"
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
