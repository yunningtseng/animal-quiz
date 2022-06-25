import { Link } from 'react-router-dom';

function Navigation() {
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
          <Link to="/user">
            <li className="mx-5">玩家專區</li>
          </Link>
        </ul>
        {/* <ul>
          <li>登入</li>
        </ul> */}
      </div>
    </div>
  );
}

export default Navigation;
