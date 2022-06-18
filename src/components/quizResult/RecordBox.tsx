import { Record } from '../../types/response';
import { Question } from '../../types/question';
import OptionBox from '../quiz/OptionBox';

interface RecordBoxProps {
  record: Record;
  question: Question;
}

function RecordBox({ record, question }: RecordBoxProps) {
  return (
    <div>
      {record.correct ? '(O)' : '(X)'}
      <div>
        <div className="flex">
          Q:
          {question.title}
        </div>

        <div className="flex">
          A:
          {question.options.map((option, index) => (
            <div key={index}>
              {question.answer.includes(index) && (
                <OptionBox option={option} questionType={question.type} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecordBox;
