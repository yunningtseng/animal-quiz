import { useAppSelector } from '../../hooks/redux';
import { Rank } from '../../types/rank';

interface RankProps {
  rankItem: Rank;
}

function Leaderboard({ rankItem }: RankProps) {
  if (!rankItem.userId) {
    return <div />;
  }
  return (
    <div className="w-1/2 mx-auto">
      <div>
        <div>
          Top
          {rankItem.rankNumber}
        </div>
        <div>
          <span>用戶名稱: </span>
          {rankItem.userName}
        </div>
        <div>
          <span>分數: </span>
          {rankItem.bestScore}
        </div>
        <div>
          <span>時間: </span>
          {rankItem.totalTime}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
