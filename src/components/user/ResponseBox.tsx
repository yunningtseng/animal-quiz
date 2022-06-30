import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setResponse } from '../../store/quizSlice';
import { Response } from '../../types/response';

interface ResponseBoxProps {
  response: Response;
}

function ResponseBox({ response }: ResponseBoxProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // * string 轉 Date object
  const date = new Date(response.startTime);
  // * 使用 Date 的 method，根據當地時區進行轉換
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString();

  let game = '';
  if (response.mode === 'normal') {
    game = '一般模式';
  } else {
    game = '限時挑戰';
  }

  return (
    <div className="block sm:flex border-b border-light mt-3 justify-between">
      <ul className="text-dark text-sm sm:text-base font-bold">
        <li>{`遊戲模式: ${game}`}</li>
        <li className="mt-3">{`作答時間: ${dateStr} ${timeStr}`}</li>
        <li className="mt-3">
          <span>分數: </span>
          {response.score}
          <span> 分</span>
        </li>
        <li className="mt-3 mb-5">
          <span>花費時間: </span>
          {response.totalTime}
          <span> 秒</span>
        </li>
      </ul>
      <button
        type="button"
        className="mb-5 h-8 text-xs sm:text-sm font-bold px-2 py-1 cursor-pointer border rounded-xl text-dark hover:bg-dark hover:text-white "
        onClick={() => {
          dispatch(setResponse(response));
          navigate('/quiz-result');
        }}
      >
        查看更多
      </button>
    </div>
  );
}

export default ResponseBox;
