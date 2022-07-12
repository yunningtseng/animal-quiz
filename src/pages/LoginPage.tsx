import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { googleLogin } from '../store/authSlice';
import { RootState } from '../store/store';

const userIdSelector = createStructuredSelector({
  isLogin: (state: RootState) => state.auth.isLogin,
});

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(userIdSelector);
  const [isSignIn, setIsSignIn] = useState(true);

  // - 如果 isLogin = true 就轉跳到其他頁面
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className="mx-auto mt-10 flex justify-center">
      <div className="flex rounded-xl p-6 bg-light shadow-xl">
        {isSignIn && (
          <div>
            <p className="text-xl text-center text-dark font-bold">會員登入</p>
            <div className="flex mt-5">
              <input
                className="focus:outline-none rounded-lg p-2 w-72"
                placeholder="Email"
              />
            </div>

            <div className="flex mt-5">
              <input
                className="focus:outline-none rounded-lg p-2 w-72"
                placeholder="密碼"
              />
            </div>

            <button
              type="button"
              className="w-24 mt-5 bg-dark text-white rounded-xl p-1"
            >
              登入
            </button>

            <p className="my-5 text-xl text-center">- 或用以下方式登入 -</p>

            <div className="flex justify-between">
              <button type="button" className="w-24 border p-1">
                Facebook
              </button>
              <button
                type="button"
                className="w-24 border p-1"
                onClick={() => {
                  dispatch(googleLogin());
                }}
              >
                Google
              </button>
            </div>

            <button
              type="button"
              className="bg-dark text-white rounded-xl mt-8 border px-2 py-1"
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              尚未有帳號，點此註冊
            </button>
          </div>
        )}

        {!isSignIn && (
          <div>
            <p className="text-xl text-center text-dark font-bold">
              註冊新帳號
            </p>
            <div className="flex mt-5">
              <input
                className="focus:outline-none rounded-lg p-2 w-72"
                placeholder="Email"
              />
            </div>

            <div className="flex mt-5">
              <input
                className="focus:outline-none rounded-lg p-2 w-72"
                placeholder="密碼"
              />
            </div>

            <div className="flex justify-between mt-5">
              <button
                type="button"
                className="w-24 bg-dark text-white rounded-xl p-1"
              >
                註冊
              </button>

              <button
                type="button"
                className="w-44 b bg-dark text-white hover:bg-dark hover:text-white rounded-xl border px-2 py-1"
                onClick={() => {
                  setIsSignIn(true);
                }}
              >
                已有帳號，點此登入
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
