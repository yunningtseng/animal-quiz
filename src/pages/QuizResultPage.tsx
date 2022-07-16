import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultBar from '../components/quizResult/ResultBar';
import ResultDialog from '../components/quizResult/ResultDialog';
import ResultRecorder from '../components/quizResult/ResultRecorder';
import { fetchResponseAndQuestions } from '../store/resultSlice';

import { useAppDispatch } from '../hooks/redux';

function QuizResultPage() {
  // - 從 useParam 抓 responseId，再去 fetch result
  const { responseId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResponseAndQuestions(responseId ?? ''));
  }, [responseId, dispatch]);

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-10 mx-auto px-0 sm:px-5 relative">
      <ResultDialog />
      <ResultBar />
      <ResultRecorder />
    </div>
  );
}

export default QuizResultPage;
