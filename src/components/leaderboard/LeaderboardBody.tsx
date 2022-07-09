import { useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRankingList, fetchRoomRankingList } from '../../store/rankSlice';
import RankingBox from './RankingBox';
import RankingBoxTop3 from './RankingBoxTop3';

function LeaderboardBody() {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const rankingList = useAppSelector((state) => state.ranking.rankingList);
  const { length } = rankingList;

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomRankingList(roomId));
    } else {
      dispatch(fetchRankingList('normal'));
    }
  }, [dispatch, roomId]);

  return (
    <div className="mt-5">
      <div className="flex sm:w-112 mx-auto items-end justify-between h-64 sm:h-80 mb-10">
        <div>
          <FaCrown className="mx-auto text-zinc-400 text-5xl" />
          {/* * 若有兩人以上在排行榜上時才會出現 */}
          {length > 1 && <RankingBoxTop3 rankItem={rankingList[1]} />}
        </div>

        <div className="self-start">
          <FaCrown className="mx-auto text-yellow-300 text-5xl" />
          {length > 0 && <RankingBoxTop3 rankItem={rankingList[0]} />}
        </div>

        <div>
          <FaCrown className="mx-auto text-amber-800 text-5xl" />
          {length > 2 && <RankingBoxTop3 rankItem={rankingList[2]} />}
        </div>
      </div>

      {rankingList.slice(3).map((rankItem, index) => (
        <RankingBox key={index} rankItem={rankItem} />
      ))}
    </div>
  );
}

export default LeaderboardBody;
