import Leaderboard from '../components/leaderboard/Leaderboard';
import { useAppSelector } from '../hooks/redux';
import { Rank } from '../types/rank';

function LeaderboardPage() {
  const rank: Rank[] = useAppSelector((state) => state.rank.rankList);

  return (
    <div>
      <p className="text-center">排行榜</p>
      {rank.map((rankItem) => (
        <Leaderboard key={rankItem.userId} rankItem={rankItem} />
      ))}
    </div>
  );
}

export default LeaderboardPage;
