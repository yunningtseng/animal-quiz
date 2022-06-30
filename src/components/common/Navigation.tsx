import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AuthState } from '../../store/authSlice';
import logo from '../../images/logo.jpg';

function Navigation() {
  const user: AuthState = useAppSelector((state) => state.auth);

  return (
    <div className="w-full bg-primary p-3 sticky top-0 z-10">
      <div className="flex w-3/4 mx-auto justify-center items-center text-lg text-secondary font-bold">
        <ul className="flex items-center">
          <Link to="/quiz">
            <li className="mx-5">QA 挑戰</li>
          </Link>
          <Link to="/leaderboard">
            <li className="mx-5">排行榜</li>
          </Link>
          <Link to="/">
            <li className="mx-5">
              <img src={logo} alt="img" className="w-14 h-14" />
            </li>
          </Link>
          <Link to="/animals">
            <li className="mx-5">動物科普</li>
          </Link>
          {user.user.name && (
            <Link to="/user">
              <li className="mx-5">玩家專區</li>
            </Link>
          )}
          {!user.user.name && (
            <Link to="/login">
              <li className="mx-5">登入</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
