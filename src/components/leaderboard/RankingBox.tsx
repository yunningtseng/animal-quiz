import { motion } from 'framer-motion';
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
      <motion.div
        className="flex justify-between items-center border rounded-2xl py-3 px-3 sm:px-10 shadow-md text-dark bg-light w-full text-sm sm:text-base font-bold"
        whileHover={{ scale: 1.03 }}
      >
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
      </motion.div>
    </div>
  );
}

export default RankingBox;
