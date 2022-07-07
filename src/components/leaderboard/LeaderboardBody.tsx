import { useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRankingList, fetchRoomRankingList } from '../../store/rankSlice';
import { RootState } from '../../store/store';
import { Response } from '../../types/response';
import { User } from '../../types/user';
import RankingBox from './RankingBox';
import LeaderboardBoxTop3 from './RankingBoxTop3';

// const selector = createSelector(
//   (state: RootState) => state.ranking.roomId,
//   (state: RootState) => state.ranking.rankingList,
//   (state: RootState) => state.ranking.roomRankingList,
//   (roomId, rankingList, roomRankingList) => ({
//     itemList: roomId === '' ? rankingList : roomRankingList,
//   }),
// );

function LeaderboardBody() {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomRankingList(roomId));
    } else {
      dispatch(fetchRankingList('normal'));
    }
  }, [dispatch, roomId]);

  const first = rankingList[0];
  const second = rankingList[1];
  const third = rankingList[2];

  function buildLeaderboardBoxTop3(
    index: number,
    user?: User,
    response?: Response,
  ) {
    let name: string;
    let score: number;
    let totalTime: number;

    if (user) {
      name = user.name ?? '';
      score = user.bestScore ?? 0;
      totalTime = user.totalTime ?? 0;
    } else {
      name = response?.userId ?? '';
      score = response?.score ?? 0;
      totalTime = response?.totalTime ?? 0;
    }

    return (
      <LeaderboardBoxTop3
        name={name}
        score={score}
        totalTime={totalTime}
        index={index}
      />
    );
  }

  return (
    <div className="mt-5">
      <div className="flex sm:w-112 mx-auto items-end justify-between h-64 sm:h-80 mb-10">
        <div>
          <FaCrown className="mx-auto text-zinc-400 text-5xl" />
          {second && buildLeaderboardBoxTop3(1, second)}
        </div>

        <div className="self-start">
          <FaCrown className="mx-auto text-yellow-300 text-5xl" />
          {first && buildLeaderboardBoxTop3(0, first)}
        </div>

        <div>
          <FaCrown className="mx-auto text-amber-800 text-5xl" />
          {third && buildLeaderboardBoxTop3(2, third)}
        </div>
      </div>

      {/* {rankingList.slice(3).map((user, index) => (
        <RankingBox key={user.id} user={user} index={index + 3} />
      ))} */}
    </div>
  );
}

export default LeaderboardBody;
