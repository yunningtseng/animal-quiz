import { useEffect, useRef, useState } from 'react';
import ResponseBox from '../components/user/ResponseBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { confirmUserName } from '../store/authSlice';
import { fetchResponses } from '../store/quizSlice';
import { Response } from '../types/response';
import { User } from '../types/user';

function UserPage() {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);
  const userNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchResponses(user.id));
    }
  }, [dispatch, user.id]);

  const responses: Response[] = useAppSelector((state) => state.quiz.responses);

  return (
    <div className="w-225 mx-auto mt-5">
      <div>
        <div className=" p-1">
          <div>遊戲紀錄</div>
          <div className="flex mt-3">
            <p className="mr-3">玩家名稱:</p>
            {!isEdit && <p>{user.name}</p>}
            {isEdit && (
              <input
                placeholder={user.name}
                className="border-b border-black focus:outline-none mr-5"
                ref={userNameRef}
              />
            )}
            {!isEdit && (
              <button
                type="button"
                className="ml-5 border rounded-lg p-1 text-xs"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                更改名稱
              </button>
            )}
            {isEdit && (
              <button
                type="button"
                className="ml-5 border rounded-lg p-1 text-xs"
                onClick={() => {
                  setIsEdit(false);
                  const userName = userNameRef.current?.value;
                  if (userName) {
                    dispatch(confirmUserName(userName));
                  }
                }}
              >
                儲存
              </button>
            )}
          </div>
        </div>
      </div>

      {responses.map((response) => (
        <div key={response.id}>
          <ResponseBox responseBox={response} />
        </div>
      ))}
    </div>
  );
}

export default UserPage;
