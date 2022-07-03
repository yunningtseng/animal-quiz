import { createSelector } from 'reselect';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmAnswer, endQuiz, nextQuestion } from '../../store/quizSlice';
import { RootState } from '../../store/store';

const controlBarSelector = createSelector(
  (state: RootState) => state.quiz.checkAnswer,
  (state: RootState) => state.quiz.mode,
  (state: RootState) => state.quiz.quizIsOver,
  (state: RootState) => state.quiz.qIdList,
  (checkAnswer, mode, quizIsOver, qIdList) => ({
    checkAnswer,
    mode,
    quizTimeIsOver: mode === 'time-challenge' && quizIsOver,
    qIdListLength: qIdList.length,
  }),
);

function ControlBar() {
  const dispatch = useAppDispatch();
  const {
    checkAnswer, mode, quizTimeIsOver, qIdListLength,
  } = useAppSelector(controlBarSelector);

  return (
    <div className="mt-5 sm:mt-10 flex justify-end">
      {checkAnswer && !quizTimeIsOver && (
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

      {!checkAnswer
        && !quizTimeIsOver
        && (mode === 'time-challenge' || qIdListLength < 10) && (
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

      {((!checkAnswer && mode === 'normal' && qIdListLength === 10)
        || quizTimeIsOver) && (
        <button
          type="button"
          className="w-40 tracking-[.5rem] text-lg font-bold border rounded-2xl px-3 py-2 bg-primary text-secondary hover:bg-dark hover:text-white"
          onClick={() => {
            dispatch(endQuiz());
          }}
        >
          作答結束
        </button>
      )}
    </div>
  );
}

export default ControlBar;
