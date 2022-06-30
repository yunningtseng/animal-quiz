import { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
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
              className="border-b border-black focus:outline-none"
              ref={userNameRef}
            />
          )}
        </div>
        <div className="flex items-center justify-center p-1 w-7 h-7 rounded-2xl hover:bg-primary ml-3 text-lg">
          {!isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <MdEdit />
            </button>
          )}
          {isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsEdit(false);
                const userName = userNameRef.current?.value;
                if (userName) {
                  dispatch(confirmUserName(userName));
                }
              }}
            >
              <BsCheckLg />
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
