import { useEffect } from 'react';
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
      <div>
        <div className="flex items-end justify-between h-72 mb-10">
          {rankingList[1] && (
            <LeaderboardBoxTop3 user={rankingList[1]} index={1} />
          )}

          <div className="self-start">
            {rankingList[0] && (
              <LeaderboardBoxTop3 user={rankingList[0]} index={0} />
            )}
          </div>
          {rankingList[2] && (
            <LeaderboardBoxTop3 user={rankingList[2]} index={2} />
          )}
        </div>

        {rankingList.slice(3).map((user, index) => (
          <RankingBox key={user.id} user={user} index={index + 3} />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardBody;
