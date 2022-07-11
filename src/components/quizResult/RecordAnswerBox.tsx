import { Record } from '../../types/response';
import { Question } from '../../types/question';

interface OptionBoxProps {
  question: Question;
  answer: number;
}

function RecordBody({ question, answer }: OptionBoxProps) {
  return (
    <div>
      <p>
        <span className="mr-2">- </span>
        {question.options[answer].name}
      </p>
      {question.options[answer].pic === '' ? (
        <div />
      ) : (
        <img src={question.options[answer].pic} alt="img" className="w-40" />
      )}
    </div>
  );
}

export default RecordBody;
