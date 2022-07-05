import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

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
      </div>

      <div className="flex text-dark text-base sm:text-lg font-bold mt-3">
        <span>{`測驗結果: ${resultState.response.score} 分 / ${resultState.response.totalTime} 秒`}</span>
      </div>
    </div>
  );
}

export default ResultBar;
