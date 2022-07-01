import { BsClock } from 'react-icons/bs';
import { useAppSelector } from '../../hooks/redux';

function TimerBox() {
  const time: number = useAppSelector((state) => state.quiz.time);

  return (
    <div className="flex items-center text-lg">
      <BsClock className="mr-3" />
      {`${time} 秒`}
    </div>
  );
}

export default TimerBox;
