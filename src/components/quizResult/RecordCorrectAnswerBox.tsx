import { BsDot } from 'react-icons/bs';
import { Option } from '../../types/question';

interface Props {
  option: Option;
}

function RecordBody({ option }: Props) {
  return (
    <div>
      <div className="flex items-center">
        <div>
          <BsDot />
        </div>
        {option.name}
      </div>

      {option.pic === '' ? (
        <div />
      ) : (
        <img src={option.pic} alt="img" className="w-40" />
      )}
    </div>
  );
}

export default RecordBody;
