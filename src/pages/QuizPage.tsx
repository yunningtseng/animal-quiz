import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { startQuiz, QuizState } from '../store/quizSlice';
import QuizBox from '../components/quiz/QuizBox';
import ControlBar from '../components/quiz/ControlBar';
import TimerBox from '../components/quiz/TimerBox';

function QuizPage() {
  // - quiz 的 type
  const { mode } = useParams();
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  // - 判斷 quiz 的 type
  useEffect(() => {
    dispatch(startQuiz(mode ?? ''));
  }, [dispatch, mode]);

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mt-10 mx-auto px-3 sm:px-10">
      <div>
        <div className="text-center">Animal Quiz</div>
        <div className="flex mt-5 mx-auto justify-between">
          <div className="mr-20">
            <span className="mr-5">得分:</span>
            {quiz.score}
          </div>
          <TimerBox />
        </div>
      </div>

      <div>
        {quiz.question.id ? (
          <div className="flex flex-col justify-start">
            {quiz.question.type && <QuizBox />}

            {quiz.showAlert && <div className="mt-3">尚未作答</div>}

            <div className="mt-5">
              {!quiz.checkAnswer && <p>{quiz.correct ? '答對囉' : '答錯囉'}</p>}
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="mt-5">
          <ControlBar />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
