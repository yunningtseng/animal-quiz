import { BsDot } from 'react-icons/bs';
import { Question } from '../../types/question';

interface OptionBoxProps {
  question: Question;
  answer: number;
}

function RecordBody({ question, answer }: OptionBoxProps) {
  return (
    <div>
      <div className="flex items-center">
        <div>
          <BsDot />
        </div>
        {question.options[answer].name}
      </div>

      {question.options[answer].pic === '' ? (
        <div />
      ) : (
        <img src={question.options[answer].pic} alt="img" className="w-40" />
      )}
    </div>
  );
}

export default RecordBody;
