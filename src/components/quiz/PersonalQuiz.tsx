import { db } from '../../utils/firebaseInit';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

function PersonalQuiz() {
  useEffect(() => {
    const q = query(collection(db, 'user'), where('name', '==', 'yunning'));

    getDocs(q).then((snapshot) => {
      const data = snapshot.docs[0].data();
      console.log(data);
    });
  }, []);

  return (
    <div>
      <div>Animal Quiz</div>
      <div className='flex'>
        <div>得分:</div>
        <div>時間:</div>
      </div>
      {/* 複選 */}
      <div>
        <p>答對囉</p>
        <p>Q: 請問下列哪些是台灣黑熊的特徵?</p>
        <div className='flex items-center'>
          <input type='checkbox' className='' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' />
          <div>熊</div>
        </div>
        <button>確認</button>
        <button>下一題</button>
      </div>

      {/* 單選 */}
      <div>
        <p>答對囉</p>
        <p>Q: 請問下列哪個是台灣黑熊的特徵?</p>
        <div className='flex items-center'>
          <input type='radio' className='' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='radio' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='radio' />
          <div>熊</div>
        </div>
        <div className='flex items-center'>
          <input type='radio' />
          <div>熊</div>
        </div>
        <button>確認</button>
        <button>下一題</button>
      </div>

      {/* 是非 */}
      <div>
        <p>Q: 請問下列特徵是否正確?</p>
        <div className='flex items-center'>
          <input type='radio' className='' />
          <div>O</div>
        </div>
        <div className='flex items-center'>
          <input type='radio' />
          <div>X</div>
        </div>
        <button>確認</button>
        <button>下一題</button>
      </div>
    </div>
  );
}

export default PersonalQuiz;
