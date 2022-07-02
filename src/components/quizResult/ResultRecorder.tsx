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
  const name = useAppSelector((state) => state.auth.user.name);

  return (
    <div className="mt-10">
      <div className="flex text-2xl text-dark font-bold">
        {!name && (
          <div className="flex">
            <div className="mr-3">請輸入玩家名稱:</div>
            <input
              type="text"
              className="border-b-2 focus:outline-none"
              ref={inputRef}
            />
          </div>
        )}
        {name && (
          <div className="flex">
            <div className="mr-3">玩家名稱:</div>
            {name}
          </div>
        )}

        {!name && (
          <button
            type="button"
            className="ml-5"
            onClick={() => {
              const userName = inputRef.current?.value;
              if (userName) {
                dispatch(confirmUserName(userName));
              }
            }}
          >
            確認
          </button>
        )}
      </div>

      <div className="flex mt-5 text-2xl text-dark font-bold">
        <span>{`測驗結果: ${quiz.response.score} 分 / ${quiz.response.totalTime} 秒`}</span>
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
