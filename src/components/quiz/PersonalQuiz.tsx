import { Link } from 'react-router-dom';
import {
  query, collection, onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseInit';

interface Options {
  pic:string;
  name: string;
}
interface Question {
  type: string;
  mainPic: string;
  options: Options[];
  title: string;
  answer: number | number[];
  inputType:string;
}

function PersonalQuiz() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  // 題目
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  // 呈現答案
  const [checkAnswer, setCheckAnswer] = useState<boolean>(true);
  // 分數
  const [score, setScore] = useState<number>(0);
  // 題目長度
  const questionLength = questionList.length;

  useEffect(() => {
    const q = query(collection(db, 'questions'));

    onSnapshot(q, (snapshot) => {
      const list:Question[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Question;
        list.push(data);
      });
      setQuestionList(list);
    });
  }, []);
  // console.log(questionList);

  function options() {
    return questionList[questionIndex]?.options.map((option, index) => (
      // ? key 要改
      <div className="flex items-center">
        <span />
        {index + 1}
        <input type={questionList[questionIndex].inputType} name={questionList[questionIndex].inputType} />
        {option.name}
        {questionList[questionIndex]?.options[index].pic === '' ? <div /> : <img src={questionList[questionIndex]?.options[index].pic} alt="img" className="w-40" /> }
        <div />
      </div>
    ));
  }

  return (
    <div>
      <div>Animal Quiz</div>
      <div className="flex justify-between">
        <div>
          得分:
          {score}
        </div>
        <div>時間:</div>
      </div>

      {questionIndex !== questionLength && (
      <div>
        {!checkAnswer && (
        <p>答對囉</p>)}

        <div>
          {/* - 題目 */}
          <div className="mb-4">
            <p>
              <span />
              {'Q1: '}
              {questionList[questionIndex]?.title}
            </p>

            <div>
              {questionList[questionIndex]?.mainPic === '' ? <div /> : <img src={questionList[questionIndex]?.mainPic} alt="img" className="w-48" /> }
            </div>
          </div>

          {/* - 選項 */}
          <div className="flex flex-wrap">
            {options()}
          </div>

          {checkAnswer && (
          <button
            type="button"
            onClick={() => {
              setCheckAnswer(false);
              setScore((prev) => (prev + 30));
            }}
          >
            確認
          </button>
          )}

          {!checkAnswer && (
          <button
            type="button"
            onClick={() => {
              setQuestionIndex((prev) => (prev + 1));
              setCheckAnswer(true);
            }}
          >
            下一題
          </button>
          )}

        </div>
      </div>
      )}

      <Link to="/quiz-result">
        {questionLength === questionIndex && (
        <button
          type="button"
        >
          作答結束
        </button>
        )}
      </Link>
    </div>
  );
}

export default PersonalQuiz;
