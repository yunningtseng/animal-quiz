import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/redux';
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
  // const dispatch = useAppDispatch();

  // const responseRef = useRef<HTMLInputElement | null>(null);
  // const responseRef = useRef<Response>({
  //   id: 'xxx',
  //   userName: 'xxx',
  // } as Response);

  // function saveAnswer() {
  //   const answer: Answer = {
  //     answer: 4,
  //     correct: true,
  //     questionId: 'xxx',
  //   };
  //   responseRef.current.data.push(answer);
  // }

  return (
    <div className="flex items-center">
      <input
        type={inputType[questionType]}
        name={inputType[questionType]}
        // ref={responseRef}
      />
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
