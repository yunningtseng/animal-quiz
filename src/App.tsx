import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import AnimalsPage from './pages/AnimalsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import UserPage from './pages/UserPage';
import AnimalPage from './pages/AnimalPage';
import LoginPage from './pages/LoginPage';
import { useAppDispatch } from './hooks/redux';
import { initAuth } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<SelectQuizPage />} />
        <Route path="/quiz/:mode" element={<QuizPage />} />
        <Route path="/quiz-result" element={<QuizResultPage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/animals/:className" element={<AnimalsPage />} />
        <Route path="/animals/:className/:order" element={<AnimalsPage />} />
        <Route
          path="/animals/:className/:order/:family"
          element={<AnimalsPage />}
        />
        <Route path="/animal/:animalId" element={<AnimalPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
