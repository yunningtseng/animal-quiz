import { useEffect } from 'react';
import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { enterRoom, startRoom } from '../store/roomSlice';
import { RootState } from '../store/store';

const selector = createSelector(
  (state: RootState) => state.room.room,
  (state: RootState) => state.room.enterStatus,
  (state: RootState) => state.auth.user.id,
  (room, enterStatus, userId) => ({
    room,
    enterStatus,
    userId,
  }),
);

function RoomPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { room, enterStatus, userId } = useAppSelector(selector);
  const {
    hostId, userIdList, pin, status,
  } = room;

  useEffect(() => {
    if (status === 'start') {
      navigate('/quiz/competition');
    }
  }, [navigate, status]);

  function roomEnter() {
    return (
      <div className="w-60 sm:w-112 text-center bg-light rounded-xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row items-center">
          <p className="text-lg font-bold text-dark">請輸入遊戲驗證碼:</p>
          <input className="w-40 border-b-2 border-dark bg-light focus:outline-none px-2 py-1 ml-0 sm:ml-3" />
        </div>
        <br />
        <button
          type="button"
          className="w-28 tracking-[.5rem] text-lg font-bold border rounded-2xl px-2 py-1 bg-dark text-white mt-5"
          onClick={() => {
            dispatch(enterRoom());
          }}
        >
          確認
        </button>

        {enterStatus === 'error' && (
          <div className="flex justify-center items-center font-bold mt-5 text-rose-500">
            <BsFillPatchExclamationFill />
            <p className="ml-1">查無此遊戲場次</p>
          </div>
        )}
      </div>
    );
  }

  function waitingRoom() {
    return (
      <div className="flex flex-col justify-center items-center w-60 sm:w-112 text-center bg-light rounded-xl shadow-xl p-6">
        <div className="flex flex-col justify-start items-start w-48">
          <p className="mt-5 text-dark text-lg font-bold">{`遊戲驗證碼: ${pin} `}</p>

          <div className="mt-10 text-secondary text-xl font-bold">
            <p>等待夥伴加入中 ...</p>
          </div>

          <div className="flex flex-col justify-start items-start">
            <p className="mt-10 text-dark text-lg font-bold">已加入成員:</p>
            {userIdList.map((id) => (
              <p key={id} className="mt-3">
                {id}
              </p>
            ))}
          </div>
        </div>

        {userId === hostId && (
          <Link to="/quiz/competition">
            <button
              type="button"
              className="mt-10 cursor-pointer w-32 rounded-lg py-2 bg-dark text-white"
              onClick={() => {
                dispatch(startRoom());
              }}
            >
              開始遊戲
            </button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-10">
      {!room.id && roomEnter()}
      {room.id && waitingRoom()}
    </div>
  );
}

export default RoomPage;
