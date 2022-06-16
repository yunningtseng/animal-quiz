import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<SelectQuizPage />} />
        <Route path="/quiz/:type" element={<QuizPage />} />
        <Route path="/quiz-result" element={<QuizResultPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
