import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { enterRoom } from '../store/roomSlice';

function RoomPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.room.room);
  const { userIdList, pin, status } = room;
  const roomId = room.id;

  useEffect(() => {
    if (status === 'start') {
      navigate('/quiz/time-challenge');
    }
  }, [navigate, status]);

  function roomEnter() {
    return (
      <div>
        <p>請輸入遊戲驗證碼</p>
        <input className="border mt-5" />
        <button
          type="button"
          onClick={() => {
            dispatch(enterRoom());
          }}
        >
          確認
        </button>
      </div>
    );
  }

  function waitingRoom() {
    return (
      <div>
        <div>
          <p>{pin}</p>
          <p className="mt-10">快分享給好友吧!</p>
          <p>等待中</p>
          <p>已加入</p>
          {userIdList.map((userId) => (
            <p key={userId}>{userId}</p>
          ))}
        </div>

        <div className="mt-5 ">
          <span>驗證碼: </span>
          <span>{pin}</span>
        </div>

        {/* TODO 只有 host 會出現此 button，點擊改變 status = start */}
        <button type="button" className="mt-10 cursor-pointer">
          開始遊戲
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-10">
      {!roomId && roomEnter()}
      {roomId && waitingRoom()}
    </div>
  );
}

export default RoomPage;
