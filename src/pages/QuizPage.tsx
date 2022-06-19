import { useParams } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import { useAppSelector } from '../hooks/redux';
import { QuizState } from '../store/quizSlice';
import PersonalQuiz from '../components/quiz/PersonalQuiz';
import ControlBar from '../components/quiz/ControlBar';

function QuizPage() {
  const { type } = useParams();
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const {
    seconds, minutes, isRunning, start, pause, reset,
  } = useStopwatch({
    autoStart: true,
  });

  return (
    <div className="w-screen mt-10">
      <div>
        <div className="text-center">Animal Quiz</div>
        <div className="w-96 md:w-150 lg:w-225 flex mt-5 mx-auto justify-between">
          <div className="mr-20">
            <span className="mr-5">得分:</span>
            {quiz.score}
          </div>
          <div>
            <span className="mr-5">時間:</span>
            {`${minutes} 分 ${seconds} 秒`}
          </div>
        </div>
      </div>

      <div className="w-xs sm:w-lg lg:w-4xl">
        {type === 'personal' && <PersonalQuiz />}
        {/* {type === 'time' && <TimeQuiz />} */}

        <div className="mt-5">
          <ControlBar start={start} pause={pause} reset={reset} />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
