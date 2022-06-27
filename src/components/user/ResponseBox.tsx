import { Response } from '../../types/response';

interface ResponseBoxProps {
  responseBox: Response;
}

function ResponseBox({ responseBox }: ResponseBoxProps) {
  // * string 轉 Date object
  const date = new Date(responseBox.startTime);
  // * 使用 Date 的 method，根據當地時區進行轉換
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString();

  return (
    <div className="border-solid border-black border-2 p-3 mt-5">
      <ul>
        <li>{`作答時間: ${dateStr} ${timeStr}`}</li>
        <li className="mt-3">
          <span>分數: </span>
          {responseBox.score}
          <span> 分</span>
        </li>
        <li className="mt-3">
          <span>花費時間: </span>
          {responseBox.totalTime}
          <span> 秒</span>
        </li>
      </ul>
      <button type="button" className="text-xs mt-3 border p-1 rounded-lg">
        查看更多
      </button>
    </div>
  );
}

export default ResponseBox;