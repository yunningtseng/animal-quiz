import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import QuizBox from './QuizBox';
import { fetchQuestionList, QuizState } from '../../store/quizSlice';

function PersonalQuiz() {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionList());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      {quiz.qId !== quiz.questionLength && (
        <div className="w-96 md:w-150 lg:w-225 mt-5 flex flex-col justify-start">
          {quiz.question.type && <QuizBox />}

          <div className="mt-5">
            {!quiz.checkAnswer && <p>{quiz.correct ? '答對囉' : '答錯囉'}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalQuiz;
