import { motion } from 'framer-motion';
import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { RankItem } from '../../types/rankItem';

interface Props {
  rankItem: RankItem;
}

const userIdSelector = createStructuredSelector({
  user: (state: RootState) => state.auth.user.id,
});

function RankingBox({ rankItem }: Props) {
  const {
    userId, rank, name, score, totalTime,
  } = rankItem;

  const { user } = useAppSelector(userIdSelector);

  if (!name) {
    return <div />;
  }

  return (
    <div className="flex justify-between items-center mb-5">
      <motion.div
        className="flex justify-between items-center border rounded-2xl py-3 px-3 sm:px-10 shadow-md text-dark bg-light w-full text-sm sm:text-base font-bold"
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex">
          <div className="mr-5">{rank}</div>
          {name}
          {user === userId ? ' (你)' : ''}
        </div>

        <div>
          {score}
          <span> 分 / </span>
          {totalTime}
          <span> 秒</span>
        </div>
      </motion.div>
    </div>
  );
}

export default RankingBox;
