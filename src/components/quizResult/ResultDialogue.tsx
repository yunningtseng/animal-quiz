import { useRef } from 'react';
import { GrClose } from 'react-icons/gr';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';

function ResultDialogue() {
  const dispatch = useAppDispatch();
  const resultState = useAppSelector((state) => state.result);
  const name = useAppSelector((state) => state.auth.user.name);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-150 h-100 absolute bg-primary top-1/4 left-1/3 p-8 rounded-lg shadow-lg border-2 border-dark tracking-wide">
      <GrClose className="ml-auto cursor-pointer" />
      <div className="flex mt-3 text-dark text-base sm:text-lg font-bold">
        {!name && (
          <div className="flex">
            <div className="mr-3">請輸入玩家名稱:</div>
            <input
              type="text"
              className="border-b-2 border-dark focus:outline-none bg-primary"
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

        {!name && (
          <button
            type="button"
            className="ml-5 bg-dark text-white text-base rounded-xl py-1 px-3"
            onClick={() => {
              const userName = inputRef.current?.value;
              if (userName) {
                dispatch(confirmUserName(userName));
              }
            }}
          >
            確認
          </button>
        )}
      </div>

      <div className="flex text-dark text-base sm:text-lg font-bold mt-3">
        <span>{`測驗結果: ${resultState.response.score} 分 / ${resultState.response.totalTime} 秒`}</span>
      </div>
    </div>
  );
}

export default ResultDialogue;
