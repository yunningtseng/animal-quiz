import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRankingList } from '../../store/rankSlice';
import { User } from '../../types/user';
import RankingBox from './RankingBox';

function LeaderboardBody() {
  const dispatch = useAppDispatch();
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );

  useEffect(() => {
    dispatch(fetchRankingList());
  }, [dispatch]);

  return (
    <div className="border p-12">
      {rankingList.map((user, index) => (
        <RankingBox key={user.id} user={user} index={index} />
      ))}
    </div>
  );
}

export default LeaderboardBody;
