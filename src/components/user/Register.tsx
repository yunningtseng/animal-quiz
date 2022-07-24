import { useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { emailRegister } from '../../store/authSlice';
import { RootState } from '../../store/store';

const userErrorSelector = createStructuredSelector({
  error: (state: RootState) => state.auth.error,
});

function Register() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(userErrorSelector);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputRefList = [nameRef, emailRef, passwordRef];
  const labelList = ['用戶名稱', 'Email', '密碼'];

  const [isBlank, setIsBlank] = useState(false);
  const [warning, setWarning] = useState('');

  function registerHandler() {
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
        name: nameRef.current?.value ?? '',
        email: emailRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
      };

      dispatch(
        emailRegister(inputData.name, inputData.email, inputData.password),
      );
    }
  }

  return (
    <div>
      <p className="text-xl text-center text-dark font-bold">註冊新帳號</p>
      <div className="flex mt-5">
        <input
          className="focus:outline-none rounded-lg p-2 w-72"
          placeholder="用戶名稱"
          ref={nameRef}
        />
      </div>

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

      <div className="flex justify-center mt-5">
        <button
          type="button"
          className="w-full text-lg bg-dark text-white rounded-xl p-1"
          onClick={() => {
            registerHandler();
          }}
        >
          註冊
        </button>
      </div>

      {isBlank && (
        <p className="mt-3 font-bold text-rose-600">
          請填寫
          {warning}
        </p>
      )}

      {error && <p className="mt-3 font-bold text-rose-600">{error}</p>}
    </div>
  );
}

export default Register;
