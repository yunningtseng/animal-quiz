import { useAppSelector } from '../../hooks/redux';
import QuizBox from './QuizBox';
import { QuizState } from '../../store/quizSlice';

function PersonalQuiz() {
  const quiz: QuizState = useAppSelector((state) => state.quiz);

  if (!quiz.question.id) {
    return <div />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-96 md:w-150 lg:w-225 mt-5 flex flex-col justify-start">
        {quiz.question.type && <QuizBox />}

        {quiz.showAlert && <div className="mt-3">尚未作答</div>}

        <div className="mt-5">
          {!quiz.checkAnswer && <p>{quiz.correct ? '答對囉' : '答錯囉'}</p>}
        </div>
      </div>
    </div>
  );
}

export default PersonalQuiz;
