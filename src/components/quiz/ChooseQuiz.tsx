import ChooseQuizBox from './ChooseQuizBox';

function ChooseQuiz() {
  return (
    <div className="w-[15rem] sm:w-[25rem] md:w-[40rem] flex flex-wrap justify-center sm:justify-between items-center mt-10 mx-auto">
      {[0, 1, 2].map((index) => (
        <ChooseQuizBox key={index} index={index} />
      ))}
    </div>
  );
}

export default ChooseQuiz;
