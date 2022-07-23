import { Record } from '../../types/response';
import { Question } from '../../types/question';
import RecordAnswerBox from './RecordAnswerBox';
import RecordCorrectAnswerBox from './RecordCorrectAnswerBox';

interface Props {
  record: Record;
  question: Question;
}
const INPUT_TYPE: { [key: string]: string } = {
  single: '單選題',
  multiple: '多選題',
  trueFalse: '是非題',
};

function RecordBody({ record, question }: Props) {
  return (
    <div className="mt-3 border-b border-stone-200 justify-between text-sm sm:text-base">
      <p className="font-bold">{question.title}</p>
      <div className="w-16 text-center rounded-full px-1 py-1 text-xs sm:text-sm bg-dark text-white mt-2 sm:mt-3">
        {INPUT_TYPE[question.type]}
      </div>

      <div
        className={`flex font-bold mt-2 sm:mt-3 ${
          record.correct ? 'text-green-600' : 'text-rose-600'
        }`}
      >
        <p className="mr-3">作答結果:</p>
        <p>{record.correct ? 'O 正確' : 'X 錯誤'}</p>
      </div>

      {!record.correct && (
        <div className="mt-2 sm:mt-3">
          <span className="font-bold text-rose-600 mr-3">你的回答</span>
          {record.answer.map((answer, index) => (
            <div key={index} className="flex">
              <RecordAnswerBox question={question} answer={answer} />
            </div>
          ))}
        </div>
      )}

      <div className="pb-5 mt-2 sm:mt-3">
        <span className="font-bold text-green-600 mr-3">正確答案</span>
        {question.options.map((option, index) => (
          <div key={index}>
            {question.answer.includes(index) && (
              <RecordCorrectAnswerBox option={option} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordBody;
