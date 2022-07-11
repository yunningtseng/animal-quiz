import LeaderboardBody from '../components/leaderboard/LeaderboardBody';

function RoomLeaderboardPage() {
  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-5 sm:mt-10">
      <p className="hidden sm:block text-3xl text-dark font-bold tracking-widest">
        排行榜
      </p>
      <LeaderboardBody />
    </div>
  );
}

export default RoomLeaderboardPage;
