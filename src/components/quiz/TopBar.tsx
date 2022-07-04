import { BsClock } from 'react-icons/bs';
import { useAppSelector } from '../../hooks/redux';

function TopBar() {
  const { score, time } = useAppSelector((state) => state.quiz);

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
