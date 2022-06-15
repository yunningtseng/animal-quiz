import { Link } from 'react-router-dom';

function ChooseQuiz() {
  return (
    <div>
      <Link to='/quiz/personal'>
        <button className='mr-2'>單人競賽</button>
      </Link>
      <button>計時挑戰</button>
    </div>
  );
}

export default ChooseQuiz;
