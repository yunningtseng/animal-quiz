import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import chameleon from '../../images/chameleon.png';

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
    score, totalTime, mode, roomId,
  } = useAppSelector(selector);

  return (
    <div className="flex justify-between items-center px-5">
      <div>
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

      <img src={chameleon} alt="img" className="w-40 hidden sm:block" />
    </div>
  );
}

export default ResultBar;
