import { useParams } from 'react-router-dom';
import PersonalQuiz from '../components/quiz/PersonalQuiz';

function QuizPage() {
  const { type } = useParams();

  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      {type === 'personal' && <PersonalQuiz />}
      {/* {type === 'time' && <TimeQuiz />} */}
    </div>
  );
}

export default QuizPage;
