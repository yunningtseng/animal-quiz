import { FaCrown } from 'react-icons/fa';

interface RankingBoxTop3Props {
  index: number;
  color: string;
}

function RankingBoxTop3({ index, color }: RankingBoxTop3Props) {
  return (
    <div>
      <FaCrown className={`mx-auto text-${color} text-5xl`} />
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
          <div className="mt-1">?</div>
          <div>
            <span>? 分 / ? 秒 </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingBoxTop3;
