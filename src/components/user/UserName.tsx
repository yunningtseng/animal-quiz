import { useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';

function UserName() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);
  const [isRename, setIsRename] = useState(true);
  const userNameRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex mt-3 items-center">
        <div className="flex text-dark text-base sm:text-lg font-bold">
          <p className="mr-3">玩家名稱:</p>
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
                setIsRename(true);
              }}
            >
              <MdEdit />
            </button>
          )}

          {isEdit && (
            <button
              type="button"
              onClick={() => {
                const userName = userNameRef.current?.value;
                if (userName) {
                  dispatch(confirmUserName(userName));
                  setIsEdit(false);
                  setIsRename(true);
                } else {
                  setIsEdit(true);
                  setIsRename(false);
                }
              }}
            >
              <BsCheckLg />
            </button>
          )}
        </div>

        <div className="ml-5">
          {isEdit && (
            <button
              type="button"
              className="text-xs sm:text-sm font-bold px-2 py-1 border rounded-xl text-dark bg-light hover:bg-dark hover:text-white"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              取消
            </button>
          )}
        </div>
      </div>

      {isEdit && !isRename && (
        <p className="font-bold mt-3 text-rose-600">尚未輸入名稱</p>
      )}
    </div>
  );
}

export default UserName;
