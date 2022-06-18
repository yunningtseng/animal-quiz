import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchResponseAndQuestions, QuizState } from '../../store/quizSlice';

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
        {/* 目前先寫死 */}
        <div>
          得分:
          {quiz.response.score}
        </div>
        <div>
          時間:
          {quiz.response.totalTime}
        </div>
      </div>

      <div>
        <div className="flex">
          <p>(O)</p>
          <div>
            <p>Q: XXXXXXXXXXXX</p>
            <p>A: XXXXXXX</p>
          </div>
        </div>
      </div>

      <Link to="/quiz">
        <button type="button">返回遊戲選單</button>
      </Link>
    </div>
  );
}

export default ResultRecorder;
