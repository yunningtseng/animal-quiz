import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

const selector = createStructuredSelector({
  userName: (state: RootState) => state.auth.user.name,
  score: (state: RootState) => state.result.response.score,
  totalTime: (state: RootState) => state.result.response.totalTime,
  mode: (state: RootState) => state.result.response.mode,
  roomId: (state: RootState) => state.result.response.roomId,
});

function ResultBar() {
  const navigate = useNavigate();
  const {
    userName, score, totalTime, mode, roomId,
  } = useAppSelector(selector);

  return (
    <div>
      <div className="block sm:flex justify-between items-center">
        <div className="text-dark text-base sm:text-lg font-bold">
          <span>玩家名稱: </span>
          <span>{userName}</span>
        </div>
      </div>

      <div className="flex text-dark text-base sm:text-lg font-bold mt-3">
        <span>{`測驗結果: ${score} 分 / ${totalTime} 秒`}</span>
      </div>
      {mode === 'competition' && (
        <button
          type="button"
          className="mt-3 h-8 text-xs sm:text-sm font-bold px-2 py-1 border rounded-xl text-dark bg-light hover:bg-dark hover:text-white"
          onClick={() => {
            navigate(`/quiz/room-leaderboard/${roomId ?? ''}`);
          }}
        >
          查看排行榜
        </button>
      )}
    </div>
  );
}

export default ResultBar;
