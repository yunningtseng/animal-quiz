import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { clearAnswer, fetchResponseAndQuestions, QuizState } from '../../store/quizSlice';
import RecordBox from './RecordBox';

function ResultRecorder() {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResponseAndQuestions());
  }, [dispatch]);

  return (
    <div>
      <div>測驗結果</div>
      <div className="flex">
        <div className="mr-5">
          得分:
          {quiz.response.score}
        </div>
        <div>
          時間:
          {quiz.response.totalTime}
        </div>
      </div>

      {quiz.questionList.map((question, index) => (
        <RecordBox
          key={index}
          record={quiz.response.records[index]}
          question={question}
        />
      ))}

      <Link to="/quiz">
        <button
          type="button"
          onClick={() => {
            dispatch(clearAnswer());
          }}
        >
          返回遊戲選單
        </button>
      </Link>
    </div>
  );
}

export default ResultRecorder;
