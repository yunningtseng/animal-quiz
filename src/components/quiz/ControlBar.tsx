import { createSelector } from 'reselect';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmAnswer, endQuiz, nextQuestion } from '../../store/quizSlice';
import { RootState } from '../../store/store';

const controlBarSelector = createSelector(
  (state: RootState) => state.quiz.canAnswer,
  (state: RootState) => state.quiz.mode,
  (state: RootState) => state.quiz.quizIsOver,
  (state: RootState) => state.quiz.qIdList,
  (canAnswer, mode, quizIsOver, qIdList) => ({
    canAnswer,
    mode,
    quizTimeIsOver: mode === 'time-challenge' && quizIsOver,
    qIdListLength: qIdList.length,
  }),
);

function ControlBar() {
  const dispatch = useAppDispatch();
  const {
    canAnswer, mode, quizTimeIsOver, qIdListLength,
  } = useAppSelector(controlBarSelector);

  return (
    <div className="mt-5 sm:mt-10 flex justify-end">
      {canAnswer && !quizTimeIsOver && (
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

      {!canAnswer
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

      {/* * TODO 調整樣式  */}
      {((!canAnswer && mode === 'normal' && qIdListLength === 10)
        || quizTimeIsOver) && (
        <div className="w-60 sm:w-64 md:w-100 lg:w-125 h-100 absolute bg-primary top-1/4 left-10 sm:left-32 md:lg:left-48 lg:left-60 xl:left-80 p-6 rounded-lg shadow-lg border-2 border-dark tracking-wide">
          <p>作答已結束</p>
          <button
            type="button"
            onClick={() => {
              dispatch(endQuiz());
            }}
          >
            確認
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlBar;
