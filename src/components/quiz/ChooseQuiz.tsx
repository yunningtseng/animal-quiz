import { useNavigate } from 'react-router-dom';
import quizBanner from '../../images/quizBanner.jpg';

function ChooseQuiz() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-5">
      <div
        className="flex-col border rounded-xl w-36 h-36 mr-10 sm:mr-20 cursor-pointer"
        aria-hidden="true"
        onClick={() => navigate('/quiz/normal')}
      >
        <button
          type="button"
          className="w-full text-xl font-bold text-dark hover:bg-dark hover:text-white"
        >
          一般模式
        </button>
        <img src={quizBanner} alt="img" className="w-full mt-5" />
      </div>

      <div
        className="flex-col border rounded-xl w-36 h-36 cursor-pointer"
        aria-hidden="true"
        onClick={() => navigate('/quiz/time-challenge')}
      >
        <button
          type="button"
          className="w-full text-xl font-bold text-dark hover:bg-dark hover:text-white"
        >
          計時挑戰
        </button>
        <img src={quizBanner} alt="img" className="w-full mt-5" />
      </div>
    </div>
  );
}

export default ChooseQuiz;
