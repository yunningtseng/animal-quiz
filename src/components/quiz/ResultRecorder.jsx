function ResultRecorder() {
  return (
    <div>
      <div>測驗結果</div>
      <div className='flex'>
        <div>得分:</div>
        <div>時間:</div>
      </div>
      <div>
        <div className='flex'>
          <p>(O)</p>
          <div>
            <p>Q: XXXXXXXXXXXX</p>
            <p>A: XXXXXXX</p>
          </div>
        </div>

        <div className='flex'>
          <p>(O)</p>
          <div>
            <p>Q: XXXXXXXXXXXX</p>
            <p>A: XXXXXXX</p>
          </div>
        </div>
      </div>
      <button>返回遊戲選單</button>
    </div>
  );
}

export default ResultRecorder;
