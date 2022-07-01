import { useAppSelector } from '../../hooks/redux';
import { Question } from '../../types/question';

const inputType: { [key: string]: string } = {
  single: '單選題',
  multiple: '複選題',
  trueFalse: '是非題',
};

function QuestionBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);

  return (
    <div>
      <p className="text-lg sm:text-xl font-bold">
        <span />
        {'Q: '}
        {question.title}
      </p>

      <div>
        {question.mainPic === '' ? (
          <div />
        ) : (
          <img src={question.mainPic} alt="img" className="w-48" />
        )}
      </div>

      <div className="w-20 text-center rounded-full px-2 py-1 text-sm sm:text-base mt-3 bg-dark text-white">
        {inputType[question.type]}
      </div>
    </div>
  );
}

export default QuestionBox;
