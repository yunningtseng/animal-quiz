import { Option } from '../../types/question';

interface OptionBoxProps {
  option: Option;
}

function RecordBody({ option }: OptionBoxProps) {
  return (
    <div>
      <p>
        <span className="mr-2">- </span>
        {option.name}
      </p>
      {option.pic === '' ? (
        <div />
      ) : (
        <img src={option.pic} alt="img" className="w-40" />
      )}
    </div>
  );
}

export default RecordBody;
