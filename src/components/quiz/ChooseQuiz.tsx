import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import time from '../../images/time.jpg';
import quiz from '../../images/quiz.jpg';

function ChooseQuiz() {
  return (
    <div className="flex justify-center mt-10">
      <Link to="/quiz/normal">
        <motion.div
          className="flex-col border rounded-xl w-48 h-40 cursor-pointer hover:text-white"
          aria-hidden="true"
          whileHover={{ scale: 1.1 }}
        >
          <p className="text-center text-xl font-bold text-dark">一般模式</p>
          <img
            src={quiz}
            alt="img"
            className="w-[11rem] h-[8rem] object-contain mx-auto"
          />
        </motion.div>
      </Link>

      <Link to="/quiz/time-challenge">
        <motion.div
          className="flex-col border rounded-xl w-48 h-40 cursor-pointer"
          aria-hidden="true"
          whileHover={{ scale: 1.1 }}
        >
          <p className="text-center text-xl font-bold text-dark">限時挑戰</p>
          <img
            src={time}
            alt="img"
            className="w-[11rem] h-[7.5rem] object-cover mx-auto"
          />
        </motion.div>
      </Link>

      <Link to="/quiz/room-menu">
        <motion.div
          className="flex-col border rounded-xl w-48 h-40 cursor-pointer"
          aria-hidden="true"
          whileHover={{ scale: 1.1 }}
        >
          <p className="text-center text-xl font-bold text-dark">多人團戰</p>
          <img
            src={time}
            alt="img"
            className="w-[11rem] h-[7.5rem] object-cover mx-auto"
          />
        </motion.div>
      </Link>
    </div>
  );
}

export default ChooseQuiz;
