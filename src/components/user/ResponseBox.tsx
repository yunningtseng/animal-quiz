import { useNavigate } from 'react-router-dom';
import { Response } from '../../types/response';

interface Props {
  response: Response;
}

function ResponseBox({ response }: Props) {
  const navigate = useNavigate();

  const date = new Date(response.startTime);

  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  let game = '';
  if (response.mode === 'normal') {
    game = '一般模式';
  } else if (response.mode === 'time-challenge') {
    game = '限時挑戰';
  } else {
    game = '多人競賽';
  }

  return (
    <div
      className="tracking-wide block sm:flex border-b border-stone-200 mt-3 justify-between cursor-pointer px-5 hover:bg-light rounded-xl"
      onClick={() => {
        navigate(`/quiz-result/${response.id}`);
      }}
      aria-hidden="true"
    >
      <ul className="text-sm sm:text-base">
        <li>
          <span className="text-dark text-lg sm:text-xl font-bold">{game}</span>
        </li>
        <li className="mt-2 sm:mt-3">
          <span>分數: </span>
          {response.score}
          <span> 分</span>
        </li>
        <li className="mt-2 sm:mt-3 mb-3">
          <span>花費時間: </span>
          {response.totalTime}
          <span> 秒</span>
        </li>
      </ul>

      <div className="mt-2 sm:mt-3 mb-3 text-sm">{`${dateStr} ${timeStr}`}</div>
    </div>
  );
}

export default ResponseBox;
