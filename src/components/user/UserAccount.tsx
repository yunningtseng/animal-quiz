import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { googleLogin } from '../../store/authSlice';
import { RootState } from '../../store/store';

const userIdSelector = createStructuredSelector({
  uId: (state: RootState) => state.auth.user.uId,
  email: (state: RootState) => state.auth.user.email,
});

function UserAccount() {
  const dispatch = useAppDispatch();
  const { uId, email } = useAppSelector(userIdSelector);

  return (
    <div className="mt-3">
      {/* - google 綁定 */}
      <div className="flex items-center">
        {!uId && <FcGoogle className="text-xl mr-2" />}

        {uId && <MdEmail className="text-yellow-800 text-xl mr-2" />}

        {uId ? (
          <div className="flex items-center">
            <span className="ml-1 text-dark font-bold">
              {email ?? ''}
            </span>
            <BsFillCheckCircleFill className="ml-3 text-green-600 text-lg" />
          </div>
        ) : (
          <div className="flex items-center">
            <button
              type="button"
              className="text-dark font-bold tracking-wide hover:text-secondary hover:font-bold"
              onClick={() => {
                dispatch(googleLogin());
              }}
            >
              點擊進行綁定
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAccount;
