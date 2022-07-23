import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import monkey from '../images/monkey.png';
import parrot from '../images/parrot.png';
import { createRoom } from '../store/roomSlice';
import { useAppDispatch, useAppStore } from '../hooks/redux';
import quizBanner from '../images/quizBanner.png';

function RoomMenuPage() {
  const [isShowPin, setIsShowPin] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const store = useAppStore();

  return (
    <div>
      <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto relative">
        <img src={quizBanner} alt="img" className="w-full mx-auto" />

        <div className="flex flex-col sm:flex-row sm:justify-evenly items-center mt-10 mx-auto">
          <Link to="/quiz/room">
            <motion.div
              className="flex-col border rounded-xl w-44 h-48 cursor-pointer mt-5 sm:mt-0"
              aria-hidden="true"
              whileHover={{ scale: 1.1 }}
            >
              <p className="py-1 rounded-t-xl bg-dark text-white text-center text-xl font-bold">
                進入遊戲
              </p>
              <img
                src={monkey}
                alt="img"
                className="w-[6rem] object-cover mx-auto mt-3"
              />
            </motion.div>
          </Link>

          <motion.div
            className="flex-col border rounded-xl w-44 h-48 cursor-pointer mt-5 sm:mt-0"
            aria-hidden="true"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setIsShowPin(true);
            }}
          >
            <p className="py-1 rounded-t-xl bg-dark text-white text-center text-xl font-bold">
              創建遊戲
            </p>
            <img
              src={parrot}
              alt="img"
              className="w-[6rem] object-cover mx-auto mt-3"
            />
          </motion.div>
        </div>

        {isShowPin && (
          <div className="flex flex-col sm:flex-row justify-center w-60 sm:w-112 lg:w-125 h-100 absolute bg-light top-24 left-10 sm:left-[2rem] md:left-[4rem] lg:left-[2.4rem] p-10 rounded-xl shadow-lg border-2 border-dark tracking-wide z-20">
            <button
              type="button"
              className="w-40 bg-dark text-white rounded-xl py-1 cursor-pointer mr-10"
              onClick={() => {
                const { user } = store.getState().auth;
                dispatch(createRoom(user));
                navigate('/quiz/room');
              }}
            >
              取得遊戲驗證碼
            </button>
            <button
              type="button"
              className="w-40 bg-dark text-white rounded-xl py-1 cursor-pointer mt-5 sm:mt-0"
              onClick={() => {
                setIsShowPin(false);
              }}
            >
              取消
            </button>
          </div>
        )}
      </div>

      {/* 黑屏 */}
      {isShowPin && (
        <div
          className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-70"
          aria-hidden="true"
          onClick={() => {
            setIsShowPin(false);
          }}
        />
      )}
    </div>
  );
}

export default RoomMenuPage;
