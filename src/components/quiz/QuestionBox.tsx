import { useAppSelector } from '../../hooks/redux';
import { Question } from '../../types/question';

function QuestionBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);

  return (
    <div className="mb-4">
      <p>
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
    </div>
  );
}

export default QuestionBox;
