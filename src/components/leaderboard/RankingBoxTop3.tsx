interface RankingBoxTop3Props {
  name: string;
  score: number;
  totalTime: number;
  index: number;
}

function RankingBoxTop3({
  name,
  score,
  totalTime,
  index,
}: RankingBoxTop3Props) {
  if (!name) {
    return <div />;
  }

  return (
    <div className="text-center text-sm sm:text-base">
      <div className="flex justify-center items-center mx-auto mb-1">
        <p className="text-secondary font-bold">{index + 1}</p>
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
