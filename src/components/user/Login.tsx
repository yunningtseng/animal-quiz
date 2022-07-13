import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '../../hooks/redux';
import { emailLogin, googleLogin } from '../../store/authSlice';

function Login() {
  const dispatch = useAppDispatch();

  // TODO useRef 存輸入資料與觸發註冊
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputRefList = [emailRef, passwordRef];
  const inputNameList = ['Email', '密碼'];

  const [isMissing, setIsMissing] = useState(false);
  const [isMissingRef, setIsMissingRef] = useState('');

  function loginHandler() {
    const missing = inputRefList.some((ref, index) => {
      if (!ref.current?.value) {
        setIsMissingRef(inputNameList[index]);
        setIsMissing(true);
        return true;
      }
      setIsMissing(false);
      return false;
    });

    if (!missing) {
      const inputData = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };

      // dispatch(emailLogin(inputData.email, inputData.password));
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

        {isMissing && (
          <p className="ml-3 font-bold text-rose-600">
            請填寫
            {isMissingRef}
          </p>
        )}
      </div>

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
