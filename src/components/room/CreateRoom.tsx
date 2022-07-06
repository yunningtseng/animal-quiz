import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createRoom } from '../../store/roomSlice';

function CreateRoom() {
  const dispatch = useAppDispatch();
  const pin = useAppSelector((state) => state.room.room.pin);

  return (
    <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-10">
      <button
        type="button"
        className="w-40 bg-dark text-white rounded-xl py-1 cursor-pointer"
        onClick={() => {
          dispatch(createRoom());
        }}
      >
        取得遊戲驗證碼
      </button>

      {pin && (
        <div className="mt-5 ">
          <span>驗證碼: </span>
          <span>{pin}</span>
        </div>
      )}

      <p className="mt-10">快分享給好友吧!</p>

      <button type="button" className="mt-10 cursor-pointer">
        進入遊戲
      </button>
    </div>
  );
}

export default CreateRoom;
