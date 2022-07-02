import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchResponseAndQuestions, QuizState } from '../../store/quizSlice';
import RecordBody from './RecordBody';

function ResultRecorder() {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResponseAndQuestions());
  }, [dispatch]);

  return (
    <div className="border rounded-lg mt-5 shadow-md px-3 md:px-10 pt-3">
      {quiz.questionList.map((question, index) => (
        <RecordBody
          key={index}
          record={quiz.response.records[index]}
          question={question}
        />
      ))}
    </div>
  );
}

export default ResultRecorder;
