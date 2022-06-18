import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmAnswer, nextQuestion, QuizState } from '../../store/quizSlice';

function ControlBar() {
  const navigate = useNavigate();
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  return (
    <>
      {quiz.checkAnswer && (
        <button type="button" onClick={() => dispatch(confirmAnswer())}>
          確認
        </button>
      )}

      {!quiz.checkAnswer && quiz.qId < quiz.questionLength - 1 && (
        <button type="button" onClick={() => dispatch(nextQuestion())}>
          下一題
        </button>
      )}

      {!quiz.checkAnswer && quiz.qId === quiz.questionLength - 1 && (
        <button type="button" onClick={() => navigate('/quiz-result')}>
          作答結束
        </button>
      )}
    </>
  );
}

export default ControlBar;
