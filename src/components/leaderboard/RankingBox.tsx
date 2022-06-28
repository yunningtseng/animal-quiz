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
    <div className="flex justify-between mb-10 border rounded-2xl p-3 shadow-lg">
      <div className="mr-5">
        Top
        {index + 1}
      </div>

      <div className="w-68">{user.name}</div>

      <div className="mb-3">{user.bestScore}</div>

      <div>
        {user.totalTime}
        <span> 秒</span>
      </div>
    </div>
  );
}

export default RankingBox;
