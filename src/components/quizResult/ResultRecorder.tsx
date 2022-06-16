import { Link } from 'react-router-dom';
import {
  query, collection, onSnapshot, where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseInit';

interface Data {
  answer: number | number[];
  correct: boolean;
  questionId:string;
}

interface Response {
  id: string;
  score: number;
  // startTime:Timestamp;
  totalTime: string;
  answer: number;
  userName:string;
  data:Data[]
}

function ResultRecorder() {
  // - 篩出特定玩家的回答
  const [responseList, setResponseList] = useState<Response[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'responses'), where('userName', '==', 'yunning'));

    onSnapshot(q, (snapshot) => {
      const list:Response[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Response;
        list.push(data);
      });
      setResponseList(list);
    });
  }, []);

  // console.log(responseList);

  // - 篩出某次測驗作答的 questionId
  // const questionsId:[] = [];
  // // ? 要怎麼去篩想要呈現的那一筆的 response
  // responseList[0]?.data.forEach((qId) => {
  //   questionsId.push(qId.questionId);
  // });

  // console.log(questionsId);

  // - 根據 questionsId，去 query firebase questions 的題目

  return (
    <div>
      <div>測驗結果</div>
      <div className="flex">
        {/* ? 目前先寫死 */}
        <div>
          得分:
          {responseList[0]?.score}
        </div>
        <div>
          時間:
          {responseList[0]?.totalTime}

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
