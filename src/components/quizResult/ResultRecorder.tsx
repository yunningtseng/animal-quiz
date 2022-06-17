import { Link } from 'react-router-dom';
import { getDoc, doc, Firestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseInit';
import { Question } from '../../types/question';
import { Response } from '../../types/response';
import firestoreApi from '../../api/firestore';

function ResultRecorder() {
  // - 篩出特定玩家的回答
  const [response, setResponse] = useState<Response>({} as Response);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    const fetchResponseAndQuestions = async () => {
      const res = await firestoreApi.getResponse('FGznKE6b3Tg43HpAvzcc');
      setResponse(res);

      // - 篩出某次測驗作答所有的 questionId
      const qIdList = res.data.map((answer) => answer.questionId);

      // - 根據 questionsId，去 query questions 的題目
      const results: Promise<Question>[] = [];
      qIdList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));
      const questionListLocal = await Promise.all(results);

      setQuestionList(questionListLocal);

      // console.log(res);
      // console.log(questionListLocal);
    };

    fetchResponseAndQuestions();
  }, []);

  return (
    <div>
      <div>測驗結果</div>
      <div className="flex">
        {/* 目前先寫死 */}
        <div>
          得分:
          {response.score}
        </div>
        <div>
          時間:
          {response.totalTime}
        </div>
      </div>

      <div>
        <div className="flex">
          <p>(O)</p>
          <div>
            <p>Q: XXXXXXXXXXXX</p>
            <p>A: XXXXXXX</p>
          </div>
        </div>
      </div>

      <Link to="/quiz">
        <button type="button">返回遊戲選單</button>
      </Link>
    </div>
  );
}

export default ResultRecorder;
