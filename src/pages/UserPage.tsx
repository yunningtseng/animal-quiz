import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ResponseBox from '../components/user/ResponseBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchResponses } from '../store/resultSlice';
import UserName from '../components/user/UserName';
import UserAccount from '../components/user/UserAccount';

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const responses = useAppSelector((state) => state.result.responses);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchResponses(user.id));
    } else {
      navigate('/login');
    }
  }, [dispatch, user.id, navigate]);

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mt-10 mx-auto px-0 sm:px-5">
      <div className="ml-5">
        <UserName />
        <UserAccount />
      </div>

      <div className="border rounded-lg mt-5 shadow-md px-3 md:px-10 pt-3">
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
          <div key={response.id}>
            <ResponseBox response={response} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
