import { useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRankingList, fetchRoomRankingList } from '../../store/rankSlice';
import { RootState } from '../../store/store';
import LockRankingBox from './LockRankingBox';
import RankingBox from './RankingBox';
import RankingBoxTop3 from './RankingBoxTop3';

const rankingListSelector = createSelector(
  (state: RootState) => state.ranking.rankingList,
  (rankingList) => ({ rankingList, length: rankingList.length }),
);

function LeaderboardBody() {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const { rankingList, length } = useAppSelector(rankingListSelector);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomRankingList(roomId));
    } else {
      dispatch(fetchRankingList('normal'));
    }
  }, [dispatch, roomId]);

  if (length === 0) {
    return <div className="flex justify-center mt-10">loading</div>;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between sm:w-112 mx-auto items-end h-64 sm:h-80 mb-10">
        {/* * 若有兩人以上在排行榜上時才會出現 */}
        {length > 1 && (
          <div>
            <FaCrown className="mx-auto text-zinc-400 text-5xl" />
            <RankingBoxTop3 rankItem={rankingList[1]} />
          </div>
        )}

        {length === 1 && <LockRankingBox index={1} color="zinc-400" />}

        <div className="self-start">
          <FaCrown className="mx-auto text-yellow-300 text-5xl" />
          {length > 0 && <RankingBoxTop3 rankItem={rankingList[0]} />}
        </div>

        {length > 2 && (
          <div>
            <FaCrown className="mx-auto text-amber-800 text-5xl" />
            <RankingBoxTop3 rankItem={rankingList[2]} />
          </div>
        )}

        {(length === 1 || length === 2) && (
          <LockRankingBox index={2} color="amber-800" />
        )}
      </div>

      {rankingList.slice(3).map((rankItem, index) => (
        <RankingBox key={index} rankItem={rankItem} />
      ))}
    </div>
  );
}

export default LeaderboardBody;
