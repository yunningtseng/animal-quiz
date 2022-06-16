import { Link } from 'react-router-dom';

function ChooseQuiz() {
  return (
    <div>
      <Link to="/quiz/personal">
        <button type="button" className="mr-2">單人競賽</button>
      </Link>
      <button type="button">計時挑戰</button>
    </div>
  );
}

export default ChooseQuiz;
