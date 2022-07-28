import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { createStructuredSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import MotionCircle from './MotionCircle';
import MotionCross from './MotionCross';
import { RootState } from '../../store/store';
import IMG_BASE_URL from '../../api/url';

const INPUT_TYPE: { [key: string]: string } = {
  single: '單選題',
  multiple: '複選題',
  trueFalse: '是非題',
};

const questionSelector = createStructuredSelector({
  title: (state: RootState) => state.quiz.question.title,
  mainPic: (state: RootState) => state.quiz.question.mainPic,
  type: (state: RootState) => state.quiz.question.type,
  questionId: (state: RootState) => state.quiz.question.id,
  canAnswer: (state: RootState) => state.quiz.canAnswer,
  showAlert: (state: RootState) => state.quiz.showAlert,
  correct: (state: RootState) => state.quiz.correct,
});

function QuestionBox() {
  const {
    title: questionTitle,
    mainPic: questionMainPic,
    type: questionType,
    questionId,
    canAnswer,
    showAlert,
    correct,
  } = useAppSelector(questionSelector);

  return (
    <div>
      <p className="text-lg sm:text-xl">{questionTitle}</p>

      <div>
        {questionMainPic === '' ? (
          <div />
        ) : (
          <img
            src={IMG_BASE_URL + questionMainPic}
            alt="img"
            className="w-96 sm:w-100 md:w-112 my-5 rounded-xl shadow-lg"
          />
        )}
      </div>

      <div className="flex items-center mt-3">
        <div className="w-20 text-center rounded-full px-2 py-1 text-sm sm:text-base bg-dark text-white">
          {INPUT_TYPE[questionType]}
        </div>

        {questionId ? (
          <div>
            {showAlert && (
              <div className="flex items-center ml-5 text-rose-600 font-bold text-lg">
                <BsFillPatchExclamationFill className="mr-1" />
                <p>尚未作答</p>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}

        {!canAnswer && (
          <div className="absolute top-1/3 left-1/2 sm:left-2/3 z-10">
            {correct && <MotionCircle size={150} />}
            {!correct && <MotionCross size={150} />}
          </div>
        )}

        {!canAnswer && (
          <div className="flex items-center">
            <p
              className={`flex items-center ml-5 font-bold text-lg ${
                correct ? 'text-green-600' : 'text-rose-600'
              }`}
            >
              {correct ? '答對囉' : '答錯囉'}
            </p>
            <p>
              {correct && (
                <AiOutlineCheckCircle className="ml-1 font-bold text-lg text-green-600" />
              )}
              {!correct && (
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
