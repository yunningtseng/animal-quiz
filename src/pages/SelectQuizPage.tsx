import ChooseQuiz from '../components/quiz/ChooseQuiz';
import quizBanner from '../images/quizBanner.jpg';

function SelectQuizPage() {
  return (
    <div className="flex-col justify-center items-center max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-3">
      <img src={quizBanner} alt="img" className="w-full md:w-125 mx-auto" />
      <ChooseQuiz />
    </div>
  );
}

export default SelectQuizPage;
