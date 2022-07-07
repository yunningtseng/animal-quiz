import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import time from '../images/time.jpg';
import quiz from '../images/quiz.jpg';
import { createRoom } from '../store/roomSlice';
import { useAppDispatch } from '../hooks/redux';

function RoomMenuPage() {
  const [isShowPin, setIsShowPin] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-5 sm:mt-10 relative">
        <div className="flex flex-col sm:flex-row items-center justify-center mt-10">
          <Link to="/quiz/room">
            <motion.div
              className="flex-col border rounded-xl w-48 h-40 cursor-pointer hover:text-white mr-0 sm:mr-5"
              aria-hidden="true"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-center text-xl font-bold text-dark">
                進入遊戲
              </p>
              <img
                src={quiz}
                alt="img"
                className="w-[11rem] h-[8rem] object-contain mx-auto"
              />
            </motion.div>
          </Link>

          <motion.div
            className="flex-col border rounded-xl w-48 h-40 cursor-pointer mt-5 sm:mt-0"
            aria-hidden="true"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setIsShowPin(true);
            }}
          >
            <p className="text-center text-xl font-bold text-dark">創建遊戲</p>
            <img
              src={time}
              alt="img"
              className="w-[11rem] h-[7.5rem] object-cover mx-auto"
            />
          </motion.div>
        </div>

        {isShowPin && (
          <div className="flex flex-col sm:flex-row justify-center w-60 sm:w-112 lg:w-125 h-100 absolute bg-light top-24 left-10 sm:left-[2rem] md:left-[4rem] lg:left-[2.4rem] p-10 rounded-xl shadow-lg border-2 border-dark tracking-wide z-20">
            <button
              type="button"
              className="w-40 bg-dark text-white rounded-xl py-1 cursor-pointer mr-10"
              onClick={() => {
                dispatch(createRoom());
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
