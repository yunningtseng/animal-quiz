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
    quizTimeIsOver: mode !== 'normal' && quizIsOver,
    qIdListLength: qIdList.length,
    hasNextQuestion: mode !== 'normal' || qIdList.length < 10,
  }),
);

function ControlBar() {
  const dispatch = useAppDispatch();
  const {
    canAnswer, mode, quizTimeIsOver, qIdListLength, hasNextQuestion,
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

      {!canAnswer && !quizTimeIsOver && hasNextQuestion && (
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

      {((!canAnswer && mode === 'normal' && qIdListLength === 10)
        || quizTimeIsOver) && (
        <div className="flex flex-col items-center w-68 sm:w-72 md:w-100 lg:w-125 h-100 absolute bg-light top-24 left-24 sm:left-28 md:left-48 lg:left-56 xl:left-72 p-6 rounded-lg shadow-lg border-2 border-dark tracking-wide">
          <p className="text-dark font-bold">作答已結束</p>
          <button
            type="button"
            onClick={() => {
              dispatch(endQuiz());
            }}
            className="bg-dark text-white py-1 px-3 rounded-xl mt-5"
          >
            確認
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlBar;
