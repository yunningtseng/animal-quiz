import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import turtle from '../../images/turtle.png';
import tiger from '../../images/tiger.png';
import penguin from '../../images/penguin.png';

interface ChooseQuizProps {
  quizType: string;
}

const quiz: { [key: string]: string } = {
  一般模式: 'normal',
  限時挑戰: 'time-challenge',
  多人競賽: 'room-menu',
};

const pic: { [key: string]: string } = {
  一般模式: turtle,
  限時挑戰: tiger,
  多人競賽: penguin,
};

const picSize: { [key: string]: string } = {
  一般模式: '9rem',
  限時挑戰: '6rem',
  多人競賽: '5.5rem',
};

function ChooseQuiz({ quizType }: ChooseQuizProps) {
  return (
    <Link to={`/quiz/${quiz[quizType]}`}>
      <motion.div
        className="flex-col border rounded-xl w-44 h-48 cursor-pointer mt-5 sm:mt-0"
        aria-hidden="true"
        whileHover={{ scale: 1.1 }}
      >
        <p className="py-1 rounded-t-xl bg-dark text-white text-center text-xl font-bold">
          {quizType}
        </p>
        <img
          src={pic[quizType]}
          alt="img"
          className={`w-[${picSize[quizType]}] ${
            pic[quizType] === 'turtle' ? '' : 'mt-3'
          } ${quizType === '一般模式' ? 'pt-10' : ''} object-cover mx-auto`}
        />
      </motion.div>
    </Link>
  );
}

export default ChooseQuiz;
