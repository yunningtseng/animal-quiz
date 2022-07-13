import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../store/store';

const userIdSelector = createStructuredSelector({
  isLogin: (state: RootState) => state.auth.isLogin,
});

function LoginPage() {
  const navigate = useNavigate();

  const { isLogin } = useAppSelector(userIdSelector);
  const [isSignIn, setIsSignIn] = useState(true);

  // - 如果 isLogin = true 就轉跳到其他頁面
  useEffect(() => {
    if (isLogin) {
      navigate('/user');
    }
  }, [isLogin, navigate]);

  return (
    <div className="mx-auto mt-10 flex justify-center">
      <div className="rounded-xl p-6 bg-light shadow-xl">
        {isSignIn && <Login />}

        {!isSignIn && <Register />}

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="w-full bg-white rounded-xl border px-2 py-1"
            onClick={() => {
              setIsSignIn((prevState) => !prevState);
            }}
          >
            {isSignIn ? '尚未有帳號，點此註冊' : '已有帳號，點此登入'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
