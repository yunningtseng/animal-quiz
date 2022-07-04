import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';

function ResultRecorder() {
  const dispatch = useAppDispatch();
  const resultState = useAppSelector((state) => state.result);
  const name = useAppSelector((state) => state.auth.user.name);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="tracking-wide">
      <div className="flex text-dark text-base sm:text-lg font-bold">
        {!name && (
          <div className="flex">
            <div className="mr-3">請輸入玩家名稱:</div>
            <input
              type="text"
              className="border-b-2 focus:outline-none"
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
            className="ml-5"
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

export default ResultRecorder;
