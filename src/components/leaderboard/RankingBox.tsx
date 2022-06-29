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
    <div className="flex justify-between items-center mb-5">
      <div className="flex justify-between items-center border rounded-2xl py-3 px-3 sm:px-10 shadow-md bg-light w-full text-sm sm:text-base">
        <div className="flex">
          <div className="mr-5">{index + 1}</div>
          {user.name}
        </div>

        <div>
          {user.bestScore}
          <span> 分 / </span>
          {user.totalTime}
          <span> 秒</span>
        </div>
      </div>

      <button
        type="button"
        className="w-28 ml-3 border rounded-2xl px-2 py-1 text-white bg-text-light"
      >
        挑戰 !
      </button>
    </div>
  );
}

export default RankingBox;
