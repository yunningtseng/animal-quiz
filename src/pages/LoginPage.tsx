import { useState } from 'react';
import login from '../images/login.jpg';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="mx-auto mt-10 flex justify-center">
      {/* <div className="flex items-center flex-row-reverse"> */}
      <div
        className={`flex items-center${isLogin ? ' flex-row-reverse' : ''}`}
      >
        <div>
          <img src={login} alt="img" className="h-96" />
        </div>

        <div className="flex border p-6">
          {isLogin && (
            <div>
              <p className="text-xl text-center">會員登入</p>
              <div className="flex mt-5">
                <input className="border-b p-2 w-72" placeholder="Email" />
              </div>

              <div className="flex mt-5">
                <input className="border-b p-2 w-72" placeholder="密碼" />
              </div>

              <button type="button" className="w-24 mt-5 border p-1">
                登入
              </button>

              <p className="my-5 text-xl text-center">- 或用以下方式登入 -</p>

              <div className="flex justify-between">
                <button type="button" className="w-24 border p-1">
                  Facebook
                </button>
                <button type="button" className="w-24 border p-1">
                  Google
                </button>
              </div>

              <button
                type="button"
                className="mt-8 border p-1"
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                尚未有帳號，點此註冊
              </button>
            </div>
          )}

          {!isLogin && (
            <div>
              <p className="text-xl text-center">註冊新帳號</p>
              <div className="flex mt-5">
                <input className="border-b p-2 w-72" placeholder="Email" />
              </div>

              <div className="flex mt-5">
                <input className="border-b p-2 w-72" placeholder="密碼" />
              </div>

              <button type="button" className="w-24 mt-5 border p-1">
                註冊
              </button>

              <p className="my-5 text-xl text-center">- 或用以下方式註冊 -</p>

              <div className="flex justify-between">
                <button type="button" className="w-24 border p-1">
                  Facebook
                </button>
                <button type="button" className="w-24 border p-1">
                  Google
                </button>
              </div>

              <button
                type="button"
                className="mt-8 border p-1"
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                已有帳號，點此登入
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
