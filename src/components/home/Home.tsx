import { motion } from 'framer-motion';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import landingBanner from '../../images/banner.png';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img
        src={landingBanner}
        alt="img"
        className="w-screen h-screen object-center object-cover opacity-50 pb-20"
      />
      <div className="absolute top-1/4 left-1/3 sm:left-1/2">
        <p className="text-xl sm:text-2xl md:text-4xl font-bold text-dark mt-16">
          來一場動物奇幻之旅吧!
        </p>

        <div className="block sm:flex items-center mt-5 md:mt-16 ml-5 text-base sm:text-lg md:text-2xl font-bold text-dark">
          <div
            className="flex items-center cursor-pointer hover:text-secondary"
            onClick={() => navigate('./quiz')}
            aria-hidden="true"
          >
            <motion.button
              type="button"
              className=""
              whileHover={{ scale: 1.2 }}
            >
              <div className="flex items-center">
                <FaArrowCircleLeft className="mr-5" />
                挑戰 Q A
              </div>
            </motion.button>
          </div>

          <span className="hidden sm:block mx-3 md:mx-5">|</span>

          <div
            className="mt-3 sm:mt-0 flex items-center cursor-pointer hover:text-secondary"
            onClick={() => navigate('./animals')}
            aria-hidden="true"
          >
            <motion.button type="button" whileHover={{ scale: 1.2 }}>
              <div className="flex items-center">
                探索動物
                <FaArrowCircleRight className="ml-5" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
