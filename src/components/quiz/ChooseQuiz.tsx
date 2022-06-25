import { useNavigate } from 'react-router-dom';

function ChooseQuiz() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="mr-10"
        onClick={() => navigate('/quiz/normal')}
      >
        單人競賽
      </button>
      <button
        type="button"
        className="mr-10"
        onClick={() => navigate('/quiz/time-challenge')}
      >
        計時挑戰
      </button>
    </div>
  );
}

export default ChooseQuiz;
