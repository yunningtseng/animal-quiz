import { User } from '../../types/user';

interface RankingBoxProps {
  user: User;
  index: number;
}

function RankingBox({ user, index }: RankingBoxProps) {
  if (!user.id) {
    return <div />;
  }

  return (
    <div className="flex justify-between mb-3">
      <div className="mr-5">
        Top
        {index + 1}
      </div>

      <div className="w-68">{`玩家名稱: ${user.name}`}</div>

      <div>
        <div className="mb-3">
          <span>分數: </span>
          {user.bestScore}
        </div>
        <div>
          <span>時間: </span>
          {user.totalTime}
          <span> 秒</span>
        </div>
      </div>
    </div>
  );
}

export default RankingBox;
