import RankingBox from '../components/leaderboard/RankingBox';
import { useAppSelector } from '../hooks/redux';
import { User } from '../types/user';

function LeaderboardPage() {
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );

  return (
    <div>
      <p className="text-center">排行榜</p>
      {rankingList.map((user) => (
        <RankingBox key={user.id} user={user} />
      ))}
    </div>
  );
}

export default LeaderboardPage;
