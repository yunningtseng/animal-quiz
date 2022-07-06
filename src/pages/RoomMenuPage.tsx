import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import time from '../images/time.jpg';
import quiz from '../images/quiz.jpg';

function RoomMenuPage() {
  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-5 sm:mt-10">
      <div className="flex justify-center mt-10">
        <Link to="/quiz/room">
          <motion.div
            className="flex-col border rounded-xl w-48 h-40 cursor-pointer hover:text-white"
            aria-hidden="true"
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-center text-xl font-bold text-dark">進入遊戲</p>
            <img
              src={quiz}
              alt="img"
              className="w-[11rem] h-[8rem] object-contain mx-auto"
            />
          </motion.div>
        </Link>

        <Link to="/quiz/create-room">
          <motion.div
            className="flex-col border rounded-xl w-48 h-40 cursor-pointer"
            aria-hidden="true"
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-center text-xl font-bold text-dark">創建遊戲</p>
            <img
              src={time}
              alt="img"
              className="w-[11rem] h-[7.5rem] object-cover mx-auto"
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default RoomMenuPage;
