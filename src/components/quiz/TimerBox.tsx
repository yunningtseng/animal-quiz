import { useAppSelector } from '../../hooks/redux';

function TimerBox() {
  const time: number = useAppSelector((state) => state.quiz.time);

  return (
    <div>
      <span className="mr-5">時間:</span>
      {`${time} 秒`}
    </div>
  );
}

export default TimerBox;
