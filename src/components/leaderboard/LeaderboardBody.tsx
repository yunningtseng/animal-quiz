import { useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRankingList } from '../../store/rankSlice';
import { User } from '../../types/user';
import RankingBox from './RankingBox';
import LeaderboardBoxTop3 from './RankingBoxTop3';

function LeaderboardBody() {
  const dispatch = useAppDispatch();
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );

  useEffect(() => {
    dispatch(fetchRankingList('normal'));
  }, [dispatch]);

  return (
    <div className="mt-5">
      <div className="flex sm:w-112 mx-auto items-end justify-between h-64 sm:h-80 mb-10">
        <div>
          <FaCrown className="mx-auto text-zinc-400 text-5xl" />
          {rankingList[1] && (
            <LeaderboardBoxTop3 user={rankingList[1]} index={1} />
          )}
        </div>

        <div className="self-start">
          <FaCrown className="mx-auto text-yellow-300 text-5xl" />
          {rankingList[0] && (
            <LeaderboardBoxTop3 user={rankingList[0]} index={0} />
          )}
        </div>

        <div>
          <FaCrown className="mx-auto text-amber-800 text-5xl" />
          {rankingList[2] && (
            <LeaderboardBoxTop3 user={rankingList[2]} index={2} />
          )}
        </div>
      </div>

      {rankingList.slice(3).map((user, index) => (
        <RankingBox key={user.id} user={user} index={index + 3} />
      ))}
    </div>
  );
}

export default LeaderboardBody;
