import { useState } from 'react';

function LeaderboardBar() {
  const [normal, isNormal] = useState(true);

  return (
    <div className="flex justify-center sm:justify-between items-center">
      <p className="hidden sm:block text-3xl pl-5 text-text-light font-bold tracking-widest">
        排行榜
      </p>
      <div className="flex justify-evenly bg-text-light rounded-3xl text-white px-3 py-2 w-full sm:w-56">
        <button
          type="button"
          className={`font-bold tracking-widest px-3 py-1 rounded-2xl ${
            normal
              ? 'bg-white text-text-light'
              : 'bg-text-light text-text-white'
          }`}
          onClick={() => {
            isNormal(true);
          }}
        >
          一般模式
        </button>
        <button
          type="button"
          className={`font-bold tracking-widest px-3 py-1 rounded-2xl ${
            !normal
              ? 'bg-white text-text-light'
              : 'bg-text-light text-text-white'
          }`}
          onClick={() => {
            isNormal(false);
          }}
        >
          限時挑戰
        </button>
      </div>
    </div>
  );
}

export default LeaderboardBar;