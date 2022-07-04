import { Link } from 'react-router-dom';
import Result from '../components/quizResult/Result';
import ResultRecorder from '../components/quizResult/ResultRecorder';
import { useAppDispatch } from '../hooks/redux';
import { clearAnswer } from '../store/quizSlice';

function QuizResultPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mt-10 mx-auto px-3 sm:px-10 relative">
      <div className="block sm:flex justify-between items-start">
        <div className="w-150 h-100 absolute bg-primary top-1/2 left-1/3 p-10 rounded-lg shadow-lg">
          <Result />
        </div>

        <Link to="/quiz">
          <button
            type="button"
            className="tracking-widest text-sm sm:text-base font-bold border rounded-2xl px-3 py-1 sm:py-2 mt-2 sm:mt-0 bg-primary text-secondary hover:bg-dark hover:text-white"
            onClick={() => {
              dispatch(clearAnswer());
            }}
          >
            返回遊戲選單
          </button>
        </Link>
      </div>
      <ResultRecorder />
    </div>
  );
}

export default QuizResultPage;
