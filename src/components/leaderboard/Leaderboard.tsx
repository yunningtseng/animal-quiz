function Leaderboard() {
  return (
    <div className="w-1/2 mx-auto">
      <p className="text-center">排行榜</p>
      <div className="flex justify-around">
        <div>
          <p>2</p>
          <div>圖片</div>
          <div>用戶名</div>
          <div>分數</div>
          <div>時間</div>
        </div>
        <div>
          <p>1</p>
          <div>圖片</div>
          <div>用戶名</div>
          <div>分數</div>
          <div>時間</div>
        </div>
        <div>
          <p>3</p>
          <div>圖片</div>
          <div>用戶名</div>
          <div>分數</div>
          <div>時間</div>
        </div>
      </div>
      <ul>
        <li>Top 4</li>
        <li>Top 5</li>
        <li>Top 6</li>
        <li>Top 7</li>
        <li>Top 8</li>
        <li>Top 9</li>
        <li>Top 10</li>
      </ul>
    </div>
  );
}

export default Leaderboard;
