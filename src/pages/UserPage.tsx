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
    <div className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto mt-5 sm:mt-10">
      <div className="block sm:flex mt-3 items-center">
        <div className="flex">
          <p className="mr-3 text-dark text-base sm:text-lg font-bold">
            玩家名稱:
          </p>
          {!isEdit && <p>{user.name}</p>}
          {isEdit && (
            <input
              placeholder={user.name}
              className="border-b border-black focus:outline-none mr-5"
              ref={userNameRef}
            />
          )}
        </div>
        <div>
          {!isEdit && (
            <button
              type="button"
              className="w-16 ml-0 mt-3 sm:ml-5 sm:mt-0 font-bold border rounded-lg p-1 text-xs text-dark hover:bg-dark hover:text-white"
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
              className="w-16 ml-0 mt-3 sm:ml-5 sm:mt-0 font-bold border rounded-lg p-1 text-xs text-dark hover:bg-dark hover:text-white"
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

      <div className="border rounded-lg mt-5 shadow-md px-10 pt-3">
        {responses.map((response) => (
          <div key={response.id}>
            <ResponseBox response={response} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
