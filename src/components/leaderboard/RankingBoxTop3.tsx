import { User } from '../../types/user';

interface RankingBoxTop3Props {
  user: User;
  index: number;
}

function RankingBoxTop3({ user, index }: RankingBoxTop3Props) {
  if (!user.id) {
    return <div />;
  }

  return (
    <div className="text-center text-sm sm:text-base">
      <div className="flex justify-center items-center mx-auto mb-3">
        <p>{index + 1}</p>
      </div>

      <div className="rounded-full w-24 h-24 sm:w-36 sm:h-36 border-2 overflow-hidden mx-auto ">
        <img
          // src={hit.mainPic}
          alt="img"
          className="h-full mx-auto object-cover object-center"
        />
      </div>

      <div className="mt-1">{user.name}</div>
      <div>
        <span>{user.bestScore}</span>
        <span> 分 </span>
        <span> / </span>
        <span>{user.totalTime}</span>
        <span> 秒 </span>
      </div>
    </div>
  );
}

export default RankingBoxTop3;
