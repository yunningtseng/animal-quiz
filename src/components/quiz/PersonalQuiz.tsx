import { useNavigate } from 'react-router-dom';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { db } from '../../utils/firebaseInit';
import { Question } from '../../types/question';
import { Answer, Response } from '../../types/response';

const inputType: { [key: string]: string } = {
  single: 'radio',
  multiple: 'checkbox',
  trueFalse: 'radio',
};

function PersonalQuiz() {
  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState<Question[]>([]);
  // 題目
  const [question, setQuestion] = useState<Question>({} as Question);
  const qIdRef = useRef<number>(0);
  // 呈現答案
  const [checkAnswer, setCheckAnswer] = useState<boolean>(true);
  // 分數
  const [score, setScore] = useState<number>(0);
  // 題目長度
  const questionLength = questionList.length;

  // TODO
  const responseRef = useRef<Response>({
    id: 'xxx',
    userName: 'xxx',
  } as Response);

  useEffect(() => {
    const q = query(collection(db, 'questions'));

    onSnapshot(q, (snapshot) => {
      const list: Question[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Question;
        list.push(data);
      });
      setQuestionList(list);
      setQuestion(list[0]);
    });
  }, []);
  // console.log(questionList);

  function options() {
    return question.options.map((option, index) => (
      <div key={index} className="flex items-center">
        <input
          type={inputType[question.type]}
          name={inputType[question.type]}
        />
        {option.name}
        {question.options[index].pic === '' ? (
          <div />
        ) : (
          <img src={question.options[index].pic} alt="img" className="w-40" />
        )}
        <div />
      </div>
    ));
  }

  // TODO 每回答一題，包成 Answer，存進 Response 中的 data
  function saveAnswer() {
    const answer: Answer = {
      answer: 4,
      correct: true,
      questionId: 'xxx',
    };
    responseRef.current.data.push(answer);
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

      {qIdRef.current !== questionLength && (
        <div>
          {!checkAnswer && <p>答對囉</p>}

          {question.type && (
            <div>
              {/* - 題目 */}
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

              {/* - 選項 */}
              <div className="flex flex-wrap">{options()}</div>

              {checkAnswer && (
                <button
                  type="button"
                  onClick={() => {
                    // TODO saveAnswer
                    saveAnswer();
                    setCheckAnswer(false);
                    setScore((prev) => prev + 30);
                  }}
                >
                  確認
                </button>
              )}

              {!checkAnswer && qIdRef.current < questionLength - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    qIdRef.current += 1;
                    setQuestion(questionList[qIdRef.current]);
                    setCheckAnswer(true);
                  }}
                >
                  下一題
                </button>
              )}

              {!checkAnswer && qIdRef.current === questionLength - 1 && (
                <button type="button" onClick={() => navigate('/quiz-result')}>
                  作答結束
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonalQuiz;
