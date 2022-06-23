import { useAppSelector } from '../../hooks/redux';
import { User } from '../../types/user';

interface RankingBoxProps {
  user: User;
}

function RankingBox({ user }: RankingBoxProps) {
  if (!user.id) {
    return <div />;
  }
  return (
    <div className="w-1/2 mx-auto">
      <div>
        <div>
          Top
          {user.rankingNumber}
        </div>
        <div>
          <span>用戶名稱: </span>
          {user.name}
        </div>
        <div>
          <span>分數: </span>
          {user.bestScore}
        </div>
        <div>
          <span>時間: </span>
          {user.totalTime}
        </div>
      </div>
    </div>
  );
}

export default RankingBox;
