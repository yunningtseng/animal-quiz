import ChooseQuizBox from './ChooseQuizBox';

const quizTypeList = ['一般模式', '限時挑戰', '多人競賽'];

function ChooseQuiz() {
  return (
    <div className="w-[15rem] sm:w-[25rem] md:w-[40rem] flex flex-wrap justify-center sm:justify-between items-center mt-10 mx-auto">
      {quizTypeList.map((quizType) => (
        <ChooseQuizBox key={quizType} quizType={quizType} />
      ))}
    </div>
  );
}

export default ChooseQuiz;
