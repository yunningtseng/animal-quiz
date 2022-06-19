import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { QuizState } from '../store/quizSlice';
import PersonalQuiz from '../components/quiz/PersonalQuiz';

function QuizPage() {
  const { type } = useParams();
  const quiz: QuizState = useAppSelector((state) => state.quiz);

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
            {quiz.score}
          </div>
        </div>
      </div>

      <div className="w-xs sm:w-lg lg:w-4xl">
        {type === 'personal' && <PersonalQuiz />}
        {/* {type === 'time' && <TimeQuiz />} */}
      </div>
    </div>
  );
}

export default QuizPage;
