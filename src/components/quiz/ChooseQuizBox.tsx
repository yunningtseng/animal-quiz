import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import turtle from '../../images/turtle.png';
import tiger from '../../images/tiger.png';
import penguin from '../../images/penguin.png';

interface Props {
  index: number;
}

const quizTypeList = ['一般模式', '限時挑戰', '多人競賽'];
const linkList = ['normal', 'time-challenge', 'room-menu'];
const picList = [turtle, tiger, penguin];
const picSizeList = ['w-36', 'w-24', 'w-22'];

function ChooseQuiz({ index }: Props) {
  return (
    <Link to={`/quiz/${linkList[index]}`}>
      <motion.div
        className="flex-col border rounded-xl w-44 h-48 cursor-pointer mt-5 sm:mt-0"
        aria-hidden="true"
        whileHover={{ scale: 1.1 }}
      >
        <p className="py-1 rounded-t-xl bg-dark text-white text-center text-xl font-bold">
          {quizTypeList[index]}
        </p>
        <img
          src={picList[index]}
          alt="img"
          className={`${picSizeList[index]} ${
            index === 0 ? 'pt-10' : 'mt-3'
          } object-cover mx-auto`}
        />
      </motion.div>
    </Link>
  );
}

export default ChooseQuiz;
