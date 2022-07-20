import { BsClock } from 'react-icons/bs';
import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

const quizSelector = createStructuredSelector({
  score: (state: RootState) => state.quiz.score,
  time: (state: RootState) => state.quiz.time,
});

function TopBar() {
  const { score, time } = useAppSelector(quizSelector);

  return (
    <div className="flex mt-5 mx-auto justify-between text-lg">
      <span>{`分數: ${score}`}</span>
      <div className="flex items-center text-lg">
        <BsClock className="mr-3" />
        {`${time} 秒`}
      </div>
    </div>
  );
}

export default TopBar;
