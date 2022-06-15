import { useParams } from 'react-router-dom';
import ChooseQuiz from '../components/quiz/ChooseQuiz';
import PersonalQuiz from '../components/quiz/PersonalQuiz';
import ResultRecorder from '../components/quiz/ResultRecorder';

function QuizPage() {
  const { stepId } = useParams();

  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      <ChooseQuiz />
      {/* {stepId === 'choice' && <ChooseQuiz />} */}
      {stepId === 'personal' && <PersonalQuiz />}
      {stepId === 'result' && <ResultRecorder />}
      {/* <ResultRecorder /> */}
    </div>
  );
}

export default QuizPage;
