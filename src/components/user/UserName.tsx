/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsCheckLg, BsFillPersonFill } from 'react-icons/bs';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { confirmUserName } from '../../store/authSlice';
import { RootState } from '../../store/store';

const userSelector = createStructuredSelector({
  name: (state: RootState) => state.auth.user.name,
});

function UserName() {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(userSelector);

  const [isEdit, setIsEdit] = useState(false);
  const [isRename, setIsRename] = useState(true);
  const userNameRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex mt-3 items-center">
        <div className="flex items-center font-bold">
          <BsFillPersonFill className="text-yellow-800 text-xl mr-2" />
          {!isEdit && <p className="text-dark ml-1">{name}</p>}
          {isEdit && (
            <input
              placeholder={name}
              className="w-40 sm:w-48 text-dark border-b border-black focus:outline-none pl-1"
              ref={userNameRef}
            />
          )}
        </div>

        <div className="flex items-center justify-center w-7 h-7 rounded-2xl hover:bg-primary ml-2 text-sm sm:text-base">
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
