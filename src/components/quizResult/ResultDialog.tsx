import { useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { createStructuredSelector } from 'reselect';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';
import { setResultDialog } from '../../store/resultSlice';
import { RootState } from '../../store/store';

const resultSelector = createStructuredSelector({
  showResultDialog: (state: RootState) => state.result.showResultDialog,
  mode: (state: RootState) => state.result.response.mode,
  score: (state: RootState) => state.result.response.score,
  totalTime: (state: RootState) => state.result.response.totalTime,
  name: (state: RootState) => state.auth.user.name,
});

function ResultDialog() {
  const dispatch = useAppDispatch();
  const {
    showResultDialog, mode, score, totalTime, name,
  } = useAppSelector(resultSelector);

  const [isRename, setIsRename] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {mode !== 'competition' && !name && showResultDialog && (
        <div className="w-68 sm:w-72 md:w-100 lg:w-125 h-100 absolute bg-light top-24 left-6 sm:left-28 md:left-48 lg:left-56 xl:left-80 p-6 rounded-lg shadow-lg border-2 border-dark tracking-wide">
          <GrClose
            className="ml-auto cursor-pointer"
            onClick={() => {
              dispatch(setResultDialog(false));
            }}
          />

          <div className="flex mt-3 text-dark font-bold">
            {!name && (
              <div className="block lg:flex">
                <div className="mr-3">請輸入玩家名稱:</div>
                <input
                  type="text"
                  className="border-b-2 border-dark focus:outline-none bg-light px-2"
                  ref={inputRef}
                />
              </div>
            )}
            {name && (
              <div className="flex">
                <div className="mr-3">玩家名稱:</div>
                {name}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {!name && (
              <button
                type="button"
                className="mt-3 bg-dark text-white rounded-xl py-1 px-3"
                onClick={() => {
                  const userName = inputRef.current?.value;
                  if (userName) {
                    dispatch(confirmUserName(userName));
                    setIsRename(true);
                  } else {
                    setIsRename(false);
                  }
                }}
              >
                確認
              </button>
            )}

            {!isRename && (
              <p className="font-bold mt-3 text-rose-600 ml-3">尚未輸入名稱</p>
            )}
          </div>

          <div className="flex text-dark font-bold mt-3 text-sm md:text-base">
            <span>{`測驗結果: ${score} 分 / ${totalTime} 秒`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultDialog;
