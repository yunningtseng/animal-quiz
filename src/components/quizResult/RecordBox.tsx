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
          <span className="mr-3">Q:</span>
          {question.title}
        </div>

        <div className="block md:flex items-start">
          <span className="mr-3">正確答案:</span>
          <div>
            {question.options.map((option, index) => (
              <div key={index} className="ml-0.5">
                {question.answer.includes(index) && (
                  <OptionBox
                    option={option}
                    index={index}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordBox;
