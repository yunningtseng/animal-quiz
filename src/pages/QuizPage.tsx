// import { useParams } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchQuestionList, QuizState } from '../store/quizSlice';
import PersonalQuiz from '../components/quiz/PersonalQuiz';
import ControlBar from '../components/quiz/ControlBar';
import TimerBox from '../components/quiz/TimerBox';

function QuizPage() {
  // const { type } = useParams();
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionList());
  }, [dispatch]);

  return (
    <div className="w-screen mt-10">
      <div>
        <div className="text-center">Animal Quiz</div>
        <div className="w-96 md:w-150 lg:w-225 flex mt-5 mx-auto justify-between">
          <div className="mr-20">
            <span className="mr-5">得分:</span>
            {quiz.score}
          </div>
          <TimerBox />
        </div>
      </div>

      <div className="w-xs sm:w-lg lg:w-4xl">
        <PersonalQuiz />

        <div className="mt-5">
          <ControlBar />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
