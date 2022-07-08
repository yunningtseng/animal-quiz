import { useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';
import { setResultDialog } from '../../store/resultSlice';

function ResultDialog() {
  const dispatch = useAppDispatch();
  const resultState = useAppSelector((state) => state.result);
  const name = useAppSelector((state) => state.auth.user.name);
  const [isRename, setIsRename] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const showResultDialog = useAppSelector(
    (state) => state.result.showResultDialog,
  );

  return (
    <div>
      {!name && showResultDialog && (
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
            <span>{`測驗結果: ${resultState.response.score} 分 / ${resultState.response.totalTime} 秒`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultDialog;
