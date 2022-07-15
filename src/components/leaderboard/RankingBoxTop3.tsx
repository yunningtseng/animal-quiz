import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { RankItem } from '../../types/rankItem';
import head1 from '../../images/head1.png';
import head2 from '../../images/head2.png';
import head3 from '../../images/head3.png';

const heads = [head1, head2, head3];

interface RankingBoxTop3Props {
  rankItem: RankItem;
}

const userIdSelector = createStructuredSelector({
  user: (state: RootState) => state.auth.user.id,
});

function RankingBoxTop3({ rankItem }: RankingBoxTop3Props) {
  const {
    userId, rank, name, score, totalTime,
  } = rankItem;
  const { user } = useAppSelector(userIdSelector);

  if (!name) {
    return <div />;
  }

  return (
    <div className="text-center text-sm sm:text-base">
      <div className="flex justify-center items-center mx-auto mb-1">
        <p className="text-secondary font-bold">{rank}</p>
      </div>

      <div className="flex items-center rounded-full w-24 h-24 sm:w-36 sm:h-36 border-2 overflow-hidden mx-auto ">
        <img
          src={heads[rank - 1]}
          alt="img"
          className="w-4/5 mx-auto object-cover object-center"
        />
      </div>

      <div className="text-secondary font-bold text-sm sm:text-base">
        <div className="mt-1">
          {name}
          {user === userId ? ' (你)' : ''}
        </div>
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
