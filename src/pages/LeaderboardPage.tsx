import LeaderboardBar from '../components/leaderboard/LeaderboardBar';
import LeaderboardBody from '../components/leaderboard/LeaderboardBody';

function LeaderboardPage() {
  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-xl mx-auto mt-5 sm:mt-10">
      <LeaderboardBar />
      <LeaderboardBody />
    </div>
  );
}

export default LeaderboardPage;
