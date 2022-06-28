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
    <div className="mt-5">
      <div className="flex items-end justify-between h-64 mb-10">
        {/* TOP 2 */}
        <div className="text-center">
          <div className="relative">
            <div className="rounded-full w-32 h-32 xs:w-36 xs:h-36 border-2 overflow-hidden mx-auto ">
              <img
                // src={hit.mainPic}
                alt="img"
                className="h-full mx-auto object-cover object-center"
              />
            </div>
            <div className="w-8 h-8 border absolute -bottom-3 right-14 bg-green-400 rounded-full flex justify-center items-center">
              <p>2</p>
            </div>
          </div>

          <div className="mt-5">YNT</div>
          <div className="mt-1">90 分 / 50 秒</div>
        </div>

        {/* TOP 1 */}
        <div className="text-center self-start">
          <div className="relative">
            <div className="rounded-full w-32 h-32 xs:w-36 xs:h-36 border-2 overflow-hidden mx-auto ">
              <img
                // src={hit.mainPic}
                alt="img"
                className="h-full mx-auto object-cover object-center"
              />
            </div>
            <div className="w-8 h-8 border absolute -bottom-3 right-14 bg-green-400 rounded-full flex justify-center items-center">
              <p>1</p>
            </div>
          </div>

          <div className="mt-5">YNT</div>
          <div className="mt-1">90 分 / 50 秒</div>
        </div>

        {/* TOP 3 */}
        <div className="text-center">
          <div className="relative">
            <div className="rounded-full w-32 h-32 xs:w-36 xs:h-36 border-2 overflow-hidden mx-auto ">
              <img
                // src={hit.mainPic}
                alt="img"
                className="h-full mx-auto object-cover object-center"
              />
            </div>
            <div className="w-8 h-8 border absolute -bottom-3 right-14 bg-green-400 rounded-full flex justify-center items-center">
              <p>3</p>
            </div>
          </div>

          <div className="mt-5">YNT</div>
          <div className="mt-1">90 分 / 50 秒</div>
        </div>
      </div>

      {/* <div className="flex justify-between font-bold text-lg">
        <p>名次</p>
        <p>玩家名稱</p>
        <p>分數</p>
        <p>時間</p>
      </div> */}

      {rankingList.slice(3).map((user, index) => (
        <RankingBox key={user.id} user={user} index={index + 3} />
      ))}
    </div>
  );
}

export default LeaderboardBody;
