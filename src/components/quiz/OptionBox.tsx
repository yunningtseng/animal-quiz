import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { QuizState, toggleAnswer } from '../../store/quizSlice';
import { Option } from '../../types/question';

interface OptionBoxProps {
  option: Option;
  questionType: string;
  index: number;
}

const inputType: { [key: string]: string } = {
  single: 'radio',
  multiple: 'checkbox',
  trueFalse: 'radio',
};

function OptionBox({ option, questionType, index }: OptionBoxProps) {
  const quiz: QuizState = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-start items-start mt-5 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
      <div
        className={`w-4 h-4 border-2 border-black mt-1 ${
          quiz.currentAnswer.includes(index) ? 'bg-black' : 'bg-white'
        }`}
        onClick={() => dispatch(toggleAnswer(index))}
        aria-hidden="true"
      />
      <div />

      <div className="w-72 sm:w-96 md:w-125 ml-3">
        <p>{option.name}</p>
        {option.pic === '' ? (
          <div />
        ) : (
          <img src={option.pic} alt="img" className="w-40" />
        )}
      </div>
    </div>
  );
}

export default OptionBox;
