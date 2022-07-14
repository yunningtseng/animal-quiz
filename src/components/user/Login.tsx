import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { emailLogin, googleLogin } from '../../store/authSlice';
import { RootState } from '../../store/store';

const userErrorSelector = createStructuredSelector({
  error: (state: RootState) => state.auth.error,
});

function Login() {
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputRefList = [emailRef, passwordRef];
  const labelList = ['Email', '密碼'];

  const [isBlank, setIsBlank] = useState(false);
  const [warning, setWarning] = useState('');

  const { error } = useAppSelector(userErrorSelector);

  function loginHandler() {
    const missing = inputRefList.some((ref, index) => {
      if (!ref.current?.value) {
        setWarning(labelList[index]);
        setIsBlank(true);
        return true;
      }
      setIsBlank(false);
      return false;
    });

    if (!missing) {
      const inputData = {
        email: emailRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
      };

      dispatch(emailLogin(inputData.email, inputData.password));
    }
  }

  return (
    <div>
      <p className="text-xl text-center text-dark font-bold">會員登入</p>
      <div className="flex mt-5">
        <input
          className="focus:outline-none rounded-lg p-2 w-72"
          placeholder="Email"
          ref={emailRef}
        />
      </div>

      <div className="flex mt-5">
        <input
          className="focus:outline-none rounded-lg p-2 w-72"
          placeholder="密碼"
          type="password"
          ref={passwordRef}
        />
      </div>

      <div className="flex items-center mt-5">
        <button
          type="button"
          className="w-24 bg-dark text-white rounded-xl p-1"
          onClick={() => {
            loginHandler();
          }}
        >
          登入
        </button>
      </div>

      {isBlank && (
        <p className="mt-3 font-bold text-rose-600">
          請填寫
          {warning}
        </p>
      )}

      {error && <p className="mt-3 font-bold text-rose-600">{error}</p>}

      <p className="my-5 text-xl text-center">- 或用以下方式登入 -</p>

      <div className="flex justify-between">
        {/* <button type="button" className="w-24 border p-1">
                Facebook
              </button> */}

        <button
          type="button"
          className="w-28 border py-1 bg-white rounded-xl"
          onClick={() => {
            dispatch(googleLogin());
          }}
        >
          <div className="flex justify-center items-center">
            <FcGoogle className="text-xl mr-3" />
            Google
          </div>
        </button>
      </div>
    </div>
  );
}

export default Login;
