import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearState, startQuiz } from '../store/quizSlice';
import QuizBox from '../components/quiz/QuizBox';
import ControlBar from '../components/quiz/ControlBar';
import TopBar from '../components/quiz/TopBar';
import { RootState } from '../store/store';

const selectNavigateToResponseId = (state: RootState) => state.quiz.navigateToResponseId;

function QuizPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateToResponseId = useAppSelector(selectNavigateToResponseId);

  useEffect(() => {
    if (navigateToResponseId) {
      navigate(`/quiz-result/${navigateToResponseId}`);
      dispatch(clearState());
    }
  }, [navigate, navigateToResponseId, dispatch]);

  useEffect(() => {
    const list = ['normal', 'time-challenge', 'competition'];
    if (list.includes(mode ?? '')) {
      dispatch(startQuiz(mode ?? ''));
    } else {
      navigate('/quiz');
    }
  }, [dispatch, mode, navigate]);

  return (
    <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mt-10 mx-auto px-0 sm:px-5 relative">
      <TopBar />
      <QuizBox />
      <ControlBar />
    </div>
  );
}

export default QuizPage;
