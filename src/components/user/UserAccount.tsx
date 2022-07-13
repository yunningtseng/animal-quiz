import { motion } from 'framer-motion';
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
        <FcGoogle className="text-xl" />
        <span className="w-[4rem] ml-3">Google:</span>
        {uId ? (
          <div className="flex items-center">
            <span>已綁定</span>
            <BsFillCheckCircleFill className="ml-3 text-green-600 text-lg" />
          </div>
        ) : (
          <div className="flex items-center">
            <motion.button
              type="button"
              className="tracking-wide hover:text-secondary hover:font-bold"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                dispatch(googleLogin());
              }}
            >
              點擊進行綁定
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAccount;
