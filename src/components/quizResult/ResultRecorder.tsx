import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  clearAnswer,
  fetchResponseAndQuestions,
  QuizState,
} from '../../store/quizSlice';
import RecordBox from './RecordBox';
import { confirmUserName, setUserName } from '../../store/authSlice';

function ResultRecorder() {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResponseAndQuestions());
  }, [dispatch]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex">
        <div className="mr-3">輸入玩家名稱:</div>
        <input className="border-2" ref={inputRef} />
        <button
          type="button"
          onClick={() => {
            const userName = inputRef.current?.value;
            if (userName) {
              dispatch(setUserName(userName));
              dispatch(confirmUserName());
            }
          }}
        >
          確認
        </button>
      </div>

      <div>測驗結果</div>
      <div className="flex">
        <div className="mr-5">
          <span>得分: </span>
          {quiz.response.score}
        </div>
        <div>
          <span>時間: </span>
          {quiz.response.totalTime}
          <span> 秒</span>
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
          className="mt-3"
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
