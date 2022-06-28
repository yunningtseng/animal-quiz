import LeaderboardBody from '../components/leaderboard/LeaderboardBody';

function LeaderboardPage() {
  return (
    <div
      className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10
    "
    >
      <p className="text-center font-bold text-2xl">排行榜</p>
      <div>
        {/* <div className="flex">
          <div className="bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white">
            一般
          </div>
          <div className="bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white">
            限時
          </div>
        </div> */}
      </div>
      <LeaderboardBody />
    </div>
  );
}

export default LeaderboardPage;
