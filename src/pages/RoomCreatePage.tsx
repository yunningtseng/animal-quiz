import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createRoom } from '../store/roomSlice';

function RoomCreatePage() {
  const dispatch = useAppDispatch();
  const pin = useAppSelector((state) => state.room.room.pin);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-10">
      <button
        type="button"
        className="w-40 bg-dark text-white rounded-xl py-1 cursor-pointer"
        onClick={() => {
          dispatch(createRoom());
          navigate('/quiz/room');
        }}
      >
        取得遊戲驗證碼
      </button>
    </div>
  );
}

export default RoomCreatePage;
