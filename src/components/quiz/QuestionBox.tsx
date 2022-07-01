import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useAppSelector } from '../../hooks/redux';
import { QuizState } from '../../store/quizSlice';
import { Question } from '../../types/question';

const inputType: { [key: string]: string } = {
  single: '單選題',
  multiple: '複選題',
  trueFalse: '是非題',
};

function QuestionBox() {
  const question: Question = useAppSelector((state) => state.quiz.question);
  const quiz: QuizState = useAppSelector((state) => state.quiz);

  return (
    <div>
      <p className="text-lg sm:text-xl">
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

      <div className="flex items-center mt-3">
        <div className="w-20 text-center rounded-full px-2 py-1 text-sm sm:text-base bg-dark text-white">
          {inputType[question.type]}
        </div>

        {quiz.question.id ? (
          <div>
            {quiz.showAlert && (
              <div className="flex items-center ml-5 text-rose-600 font-bold text-lg">
                <BsFillPatchExclamationFill className="mr-1" />
                <p>尚未作答</p>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}

        {!quiz.checkAnswer && (
          <div className="flex items-center">
            <p
              className={`flex items-center ml-5 font-bold text-lg ${
                quiz.correct ? 'text-green-600' : 'text-rose-600'
              }`}
            >
              {quiz.correct ? '答對囉' : '答錯囉'}
            </p>
            <p>
              {quiz.correct && (
                <AiOutlineCheckCircle className="ml-1 font-bold text-lg text-green-600" />
              )}
              {!quiz.correct && (
                <VscError className="ml-1 font-bold text-lg text-rose-600" />
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionBox;
