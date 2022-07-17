import ChooseQuiz from '../components/quiz/ChooseQuiz';
import quizBanner from '../images/quizBanner.png';

function SelectQuizPage() {
  return (
    <div className="flex-col justify-center items-center max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mt-8">
      <img src={quizBanner} alt="img" className="w-full mx-auto" />
      <ChooseQuiz />
    </div>
  );
}

export default SelectQuizPage;
