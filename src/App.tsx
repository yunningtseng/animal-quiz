import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import AnimalPage from './pages/AnimalPage';
import LeaderboardPage from './pages/LeaderboardPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<SelectQuizPage />} />
        <Route path="/quiz/:type" element={<QuizPage />} />
        <Route path="/quiz-result" element={<QuizResultPage />} />
        <Route path="/animals" element={<AnimalPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
