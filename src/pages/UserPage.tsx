import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ResponseBox from '../components/user/ResponseBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchResponses } from '../store/resultSlice';
import UserName from '../components/user/UserName';
import UserAccount from '../components/user/UserAccount';
import chameleon from '../images/chameleon.png';

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const initState = useAppSelector((state) => state.auth.initState);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const responses = useAppSelector((state) => state.result.responses);

  useEffect(() => {
    // - initAuth 還沒結束
    if (!initState) return;

    if (isLogin) {
      dispatch(fetchResponses(user.id));
    } else {
      navigate('/login');
    }
  }, [dispatch, user.id, initState, isLogin, navigate]);

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-10 mx-auto px-0 sm:px-5">
      <div className="flex justify-between items-center">
        <div className="ml-5">
          <UserName />
          <UserAccount />
        </div>

        <img src={chameleon} alt="img" className="hidden sm:block w-44 mr-10" />
      </div>

      <div className="border rounded-lg mt-5 shadow-md px-3 md:px-10 py-3">
        {/* TODO 做一個 loading，用 isLoading 控制顯示 */}

        {responses.length === 0 && (
          <div className="flex justify-center p-3 md:p-10">
            <div className="flex flex-col items-start text-lg md:text-xl font-bold">
              <span className="text-dark">還沒有遊戲紀錄喔! 快來挑戰吧</span>

              <Link to="/quiz">
                <motion.button
                  type="button"
                  className="mt-5 ml-3"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="flex items-center text-secondary">
                    <FaArrowCircleRight className="mr-5" />
                    進入 QA 挑戰
                  </div>
                </motion.button>
              </Link>
            </div>
          </div>
        )}

        {responses.map((response) => (
          <motion.div key={response.id} whileHover={{ scale: 1.05 }}>
            <ResponseBox response={response} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
