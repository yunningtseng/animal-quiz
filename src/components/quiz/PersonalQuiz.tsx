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
    <div>
      <div>Animal Quiz</div>
      <div className="flex justify-between">
        <div>
          得分:
          {quiz.score}
        </div>
        <div>時間:</div>
      </div>

      {quiz.qId !== quiz.questionLength && (
        <div>
          {!quiz.checkAnswer && <p>答對囉</p>}

          {quiz.question.type && <QuizBox />}
        </div>
      )}
    </div>
  );
}

export default PersonalQuiz;
