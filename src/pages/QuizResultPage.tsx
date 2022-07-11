import ResultBar from '../components/quizResult/ResultBar';
import ResultDialog from '../components/quizResult/ResultDialog';
import ResultRecorder from '../components/quizResult/ResultRecorder';

function QuizResultPage() {
  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-10 mx-auto px-0 sm:px-5 relative">
      <ResultDialog />
      <ResultBar />
      <ResultRecorder />
    </div>
  );
}

export default QuizResultPage;
