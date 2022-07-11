import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../hooks/redux';
import { AuthState } from '../../store/authSlice';
import logo from '../../images/logo.jpg';

function Navigation() {
  const user: AuthState = useAppSelector((state) => state.auth);
  const [expand, isExpand] = useState(false);

  return (
    <div>
      <div className="flex items-center w-full h-16 bg-primary sticky top-0 z-20">
        <div className="hidden md:flex w-3/4 mx-auto justify-center items-center text-lg text-secondary font-bold">
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

        {/* mobile */}
        <div className="flex items-center pl-10">
          {!expand && (
            <GiHamburgerMenu
              className="md:hidden font-bold text-xl text-secondary cursor-pointer"
              onClick={() => {
                isExpand((prevState) => !prevState);
              }}
            />
          )}
          {expand && (
            <AiOutlineClose
              className="md:hidden font-bold text-xl text-secondary cursor-pointer"
              onClick={() => {
                isExpand((prevState) => !prevState);
              }}
            />
          )}
        </div>
      </div>
      {expand && (
        <div className="md:hidden w-full absolute top-16 z-20">
          <ul className="bg-light w-full text-center">
            <Link to="/">
              <li
                className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                onClick={() => {
                  isExpand((prevState) => !prevState);
                }}
                aria-hidden="true"
              >
                首頁
              </li>
            </Link>
            <Link to="/quiz">
              <li
                className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                onClick={() => {
                  isExpand((prevState) => !prevState);
                }}
                aria-hidden="true"
              >
                QA 挑戰
              </li>
            </Link>
            <Link to="/leaderboard">
              <li
                className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                onClick={() => {
                  isExpand((prevState) => !prevState);
                }}
                aria-hidden="true"
              >
                排行榜
              </li>
            </Link>
            <Link to="/animals">
              <li
                className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                onClick={() => {
                  isExpand((prevState) => !prevState);
                }}
                aria-hidden="true"
              >
                動物科普
              </li>
            </Link>
            {user.user.name && (
              <Link to="/user">
                <li
                  className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                  onClick={() => {
                    isExpand((prevState) => !prevState);
                  }}
                  aria-hidden="true"
                >
                  玩家專區
                </li>
              </Link>
            )}
            {!user.user.name && (
              <Link to="/login">
                <li
                  className="border-t text-secondary border-dark py-3 text-lg font-bold hover:bg-dark hover:text-white"
                  onClick={() => {
                    isExpand((prevState) => !prevState);
                  }}
                  aria-hidden="true"
                >
                  登入
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navigation;
