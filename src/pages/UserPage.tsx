function UserPage() {
  return (
    <div>
      <div className="w-3/4 mx-auto mt-5">
        <div className="p-3">遊戲紀錄</div>

        <div className="border-solid border-black border-2 p-5">
          <div className="flex">
            <p className="mr-3">玩家名稱:</p>
            <input className="border-solid border-black border-2 mr-5" />
            <button type="button">編輯/儲存</button>
          </div>

          <div className="border-solid border-black border-2 p-3 mt-5">
            <ul>
              <li>作答時間: </li>
              <li className="mt-3">分數: </li>
              <li className="mt-3">花費時間: </li>
            </ul>
            <button type="button" className="mt-3">
              查看詳細作答資訊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
