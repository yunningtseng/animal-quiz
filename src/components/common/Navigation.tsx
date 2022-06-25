import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AuthState } from '../../store/authSlice';

function Navigation() {
  const user: AuthState = useAppSelector((state) => state.auth);

  return (
    <div className="bg-primary p-5">
      <div className="flex w-3/4 mx-auto justify-center text-lg text-secondary font-bold">
        <ul className="flex">
          <Link to="/">
            <li className="mx-5">logo</li>
          </Link>
          <Link to="/quiz">
            <li className="mx-5">QA 挑戰</li>
          </Link>
          <Link to="/leaderboard">
            <li className="mx-5">排行榜</li>
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
