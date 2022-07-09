import { RankItem } from '../../types/rankItem';

interface RankingBoxTop3Props {
  rankItem: RankItem;
}

function RankingBoxTop3({ rankItem }: RankingBoxTop3Props) {
  const {
    rank, name, score, totalTime,
  } = rankItem;

  if (!name) {
    return <div />;
  }

  return (
    <div className="text-center text-sm sm:text-base">
      <div className="flex justify-center items-center mx-auto mb-1">
        <p className="text-secondary font-bold">{rank}</p>
      </div>

      <div className="rounded-full w-24 h-24 sm:w-36 sm:h-36 border-2 overflow-hidden mx-auto ">
        <img
          // src={hit.mainPic}
          alt="img"
          className="h-full mx-auto object-cover object-center"
        />
      </div>

      <div className="text-secondary font-bold text-sm sm:text-base">
        <div className="mt-1">{name}</div>
        <div>
          <span>{score}</span>
          <span> 分 </span>
          <span> / </span>
          <span>{totalTime}</span>
          <span> 秒 </span>
        </div>
      </div>
    </div>
  );
}

export default RankingBoxTop3;
