import { useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { emailRegister } from '../../store/authSlice';

function Register() {
  const dispatch = useAppDispatch();

  // TODO useRef 存輸入資料與觸發註冊
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputRefList = [nameRef, emailRef, passwordRef];
  const inputNameList = ['用戶名稱', 'Email', '密碼'];

  const [isMissing, setIsMissing] = useState(false);
  const [isMissingRef, setIsMissingRef] = useState('');

  function registerHandler() {
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
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };

      // dispatch(
      //   emailRegister(inputData.name, inputData.email, inputData.password),
      // );
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
          ref={passwordRef}
        />
      </div>

      <div className="flex items-center mt-5">
        <button
          type="button"
          className="w-24 bg-dark text-white rounded-xl p-1"
          onClick={() => {
            registerHandler();
          }}
        >
          註冊
        </button>

        {isMissing && (
          <p className="ml-3 font-bold text-rose-600">
            請填寫
            {isMissingRef}
          </p>
        )}

        {/* TODO 點擊 btn 後檢查 email 是否已有資料，如果有就顯示 */}
        {/* <p className="ml-3 font-bold text-rose-600">已註冊過囉!</p> */}
      </div>
    </div>
  );
}

export default Register;
