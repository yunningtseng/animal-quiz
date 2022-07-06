// import { useAppSelector } from '../../hooks/redux';
// import { useNavigate } from 'react-router-dom';

function MultiplayerMenu() {
  return (
    <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-10">
      <p>請輸入遊戲驗證碼</p>
      <input className="border mt-5" />
      <button type="button">確認</button>
    </div>
  );
}

export default MultiplayerMenu;
