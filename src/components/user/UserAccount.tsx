import { motion } from 'framer-motion';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { googleLogin } from '../../store/authSlice';
import { RootState } from '../../store/store';

const userIdSelector = createStructuredSelector({
  googleId: (state: RootState) => state.auth.user.googleId,
  // FIXME
  emailId: (state: RootState) => state.auth.user.googleId,
});

function UserAccount() {
  const dispatch = useAppDispatch();
  const { googleId, emailId } = useAppSelector(userIdSelector);

  return (
    <div className="mt-3">
      {/* - google 綁定 */}
      <div className="flex items-center">
        <FcGoogle className="text-xl" />
        <span className="w-[4rem] ml-3">Google:</span>
        {googleId ? (
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

      {/* - email 綁定 */}
      <div className="flex items-center mt-3">
        <MdEmail className="text-xl text-dark" />
        <span className="w-[4rem] ml-3">Email:</span>
        {emailId ? (
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
