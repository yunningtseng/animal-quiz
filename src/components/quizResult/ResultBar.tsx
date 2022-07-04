import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearAnswer } from '../../store/quizSlice';

function ResultBar() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.user.name);
  const resultState = useAppSelector((state) => state.result);

  return (
    <div>
      <div className="block sm:flex justify-between items-center">
        <div className="text-dark text-base sm:text-lg font-bold">
          <span>玩家名稱: </span>
          <span>{name}</span>
        </div>

        {/* <Link to="/quiz">
          <button
            type="button"
            className="tracking-widest text-sm sm:text-base font-bold border rounded-2xl px-3 py-1 sm:py-2 mt-2 sm:mt-0 bg-primary text-secondary hover:bg-dark hover:text-white"
            onClick={() => {
              dispatch(clearAnswer());
            }}
          >
            返回遊戲選單
          </button>
        </Link> */}
      </div>

      <div className="flex text-dark text-base sm:text-lg font-bold mt-3">
        <span>{`測驗結果: ${resultState.response.score} 分 / ${resultState.response.totalTime} 秒`}</span>
      </div>
    </div>
  );
}

export default ResultBar;
