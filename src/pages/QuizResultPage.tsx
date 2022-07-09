import ResultBar from '../components/quizResult/ResultBar';
import ResultDialog from '../components/quizResult/ResultDialog';
import ResultRecorder from '../components/quizResult/ResultRecorder';

function QuizResultPage() {
  return (
    <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mt-10 mx-auto px-0 sm:px-5 relative">
      <ResultDialog />
      <ResultBar />
      <ResultRecorder />
    </div>
  );
}

export default QuizResultPage;
