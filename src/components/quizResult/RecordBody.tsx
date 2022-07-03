import { Record } from '../../types/response';
import { Question } from '../../types/question';
import RecordBox from './RecordBox';

interface RecordBodyProps {
  record: Record;
  question: Question;
}
const inputType: { [key: string]: string } = {
  single: '單選題',
  multiple: '多選題',
  trueFalse: '是非題',
};

function RecordBody({ record, question }: RecordBodyProps) {
  return (
    <div className="mt-3 border-b border-light justify-between text-sm sm:text-base">
      <p>{`Q: ${question.title}`}</p>
      <div className="w-16 text-center rounded-full px-1 py-1 text-xs sm:text-sm bg-dark text-white mt-2 sm:mt-3">
        {inputType[question.type]}
      </div>
      <div className="flex mt-2 sm:mt-3">
        <p className="mr-3">作答結果:</p>
        <p>{record.correct ? 'O 正確' : 'X 錯誤'}</p>
      </div>

      {/* <div className="mt-2 sm:mt-3">
        <span className="mr-3">你的答案:</span>
        {record.answer.map((option, index) => (
          <div key={index}>
            {question.answer.includes(index) && <RecordBox option={option} />}
          </div>
        ))}
      </div> */}

      <div className="pb-5 mt-2 sm:mt-3">
        <span className="mr-3">正確答案:</span>
        {question.options.map((option, index) => (
          <div key={index}>
            {question.answer.includes(index) && <RecordBox option={option} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordBody;
