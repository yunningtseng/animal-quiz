import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ResultBar from '../components/quizResult/ResultBar';
import ResultDialog from '../components/quizResult/ResultDialog';
import ResultRecorder from '../components/quizResult/ResultRecorder';
import { fetchResponseAndQuestions } from '../store/resultSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RootState } from '../store/store';

const resultSelector = createStructuredSelector({
  isLoading: (state: RootState) => state.result.isLoading,
});

let previousResponseId = '';

function QuizResultPage() {
  // - 從 useParam 抓 responseId，再去 fetch result
  const { responseId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(resultSelector);

  useEffect(() => {
    dispatch(fetchResponseAndQuestions(responseId ?? ''));
  }, [responseId, dispatch]);

  // - 控制顯示 loading
  if (previousResponseId !== responseId || isLoading) {
    previousResponseId = responseId ?? '';
    return (
      <div className="flex justify-center mt-60">
        <Box>
          <CircularProgress color="warning" />
        </Box>
      </div>
    );
  }

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-10 mx-auto px-0 sm:px-5 relative">
      <ResultDialog />
      <ResultBar />
      <ResultRecorder />
    </div>
  );
}

export default QuizResultPage;
