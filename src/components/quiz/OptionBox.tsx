import { Option } from '../../types/question';

interface OptionBoxProps {
  option: Option;
  questionType: string;
}

const inputType: { [key: string]: string } = {
  single: 'radio',
  multiple: 'checkbox',
  trueFalse: 'radio',
};

function OptionBox({ option, questionType }: OptionBoxProps) {
  return (
    <div className="flex items-center">
      <input type={inputType[questionType]} name={inputType[questionType]} />
      {option.name}
      {option.pic === '' ? (
        <div />
      ) : (
        <img src={option.pic} alt="img" className="w-40" />
      )}
      <div />
    </div>
  );
}

export default OptionBox;
