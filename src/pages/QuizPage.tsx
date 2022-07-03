import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearState, startQuiz } from '../store/quizSlice';
import QuizBox from '../components/quiz/QuizBox';
import ControlBar from '../components/quiz/ControlBar';
import TopBar from '../components/quiz/TopBar';
import { RootState } from '../store/store';

const selectNavigateToResult = (state: RootState) => state.quiz.navigateToResult;

function QuizPage() {
  // - quiz 的 type
  const { mode } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateToResult = useAppSelector(selectNavigateToResult);

  useEffect(() => {
    if (navigateToResult) {
      navigate('/quiz-result');
      dispatch(clearState());
    }
  }, [navigate, navigateToResult, dispatch]);

  // - 判斷 quiz 的 type
  useEffect(() => {
    dispatch(startQuiz(mode ?? ''));
  }, [dispatch, mode]);

  return (
    <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mt-10 mx-auto px-0 sm:px-5">
      <TopBar />
      <QuizBox />
      <ControlBar />
    </div>
  );
}

export default QuizPage;
