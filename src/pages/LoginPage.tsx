import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setError } from '../store/authSlice';
import { RootState } from '../store/store';
import monkey from '../images/monkey-tree.png';

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
      navigate('/user');
    }
  }, [isLogin, navigate]);

  return (
    <div className="flex justify-center mx-auto pt-10">
      <img src={monkey} alt="img" className="hidden md:block w-[20rem] h-full mt-12" />

      <div className="rounded-xl p-6 bg-light shadow-xl ml-3">
        {isSignIn && <Login />}

        {!isSignIn && <Register />}

        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="w-3/4 bg-white rounded-xl border px-2 py-1"
            onClick={() => {
              setIsSignIn((prevState) => !prevState);
              dispatch(setError(''));
            }}
          >
            {isSignIn ? '點此註冊帳號' : '點此登入帳號'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
