import { Record } from '../../types/response';
import { Question } from '../../types/question';
import OptionBox from '../quiz/OptionBox';

interface RecordBoxProps {
  record: Record;
  question: Question;
}

function RecordBox({ record, question }: RecordBoxProps) {
  return (
    <div className="mt-3">
      {record.correct ? '(O)' : '(X)'}
      <div className="items-center">
        <div className="flex">
          Q:
          {question.title}
        </div>

        <div className="flex items-center">
          A:
          {question.options.map((option, index) => (
            <div key={index} className="ml-0.5">
              {question.answer.includes(index) && (
                <OptionBox
                  option={option}
                  questionType={question.type}
                  index={index}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecordBox;
