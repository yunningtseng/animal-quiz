import RankingBox from '../components/leaderboard/RankingBox';
import { useAppSelector } from '../hooks/redux';
import { User } from '../types/user';

function LeaderboardPage() {
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );

  return (
    <div className="w-1/2 mx-auto mt-5">
      <p className="text-center font-bold text-2xl">排行榜</p>
      <div>
        <div className="flex">
          <div className="bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white">
            一般
          </div>
          <div className="bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white">
            限時
          </div>
        </div>
        <div className="border p-12">
          {rankingList.map((user) => (
            <RankingBox key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
