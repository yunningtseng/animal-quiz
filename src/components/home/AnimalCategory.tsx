import { useNavigate } from 'react-router-dom';
import IMG_BASE_URL from '../../api/url';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-0 xl:mt-3">
      <div className="flex flex-col mb-10">
        <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg border-2 border-neutral-800 shadow-xl">
          <img
            src={`${IMG_BASE_URL}Choloepus-didactylus-01.jpg`}
            alt="img"
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="flex flex-col text-dark font-bold mt-5 px-1">
          <span className="text-center text-lg sm:text-xl mb-3">
            哺乳類 / Mammals
          </span>
          <button
            type="button"
            className="mb-0 sm:mb-5 h-8 text-sm sm:text-base font-bold px-2 py-1 border rounded-xl text-dark bg-light hover:bg-dark hover:text-white"
            onClick={() => navigate('/animals')}
          >
            查看更多
          </button>
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg border-2 border-neutral-800 shadow-xl">
          <img
            src={`${IMG_BASE_URL}Ramphastos-toco-01.jpg`}
            alt="img"
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="flex flex-col text-dark font-bold mt-5 px-1">
          <span className="text-center text-lg sm:text-xl mb-3">
            鳥類 / Birds
          </span>
          <button
            type="button"
            className="mb-0 sm:mb-5 h-8 text-xs sm:text-sm font-bold px-2 py-1 border rounded-xl text-dark bg-light hover:bg-dark hover:text-white"
            onClick={() => navigate('/animals')}
          >
            查看更多
          </button>
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg border-2 border-neutral-800 shadow-xl">
          <img
            src={`${IMG_BASE_URL}Ideopsis-similis-01.jpg`}
            alt="img"
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="flex flex-col text-dark font-bold mt-5 px-1">
          <span className="text-center text-lg sm:text-xl mb-3">
            變溫動物 / Ectotherms
          </span>
          <button
            type="button"
            className="mb-0 sm:mb-5 h-8 text-xs sm:text-sm font-bold px-2 py-1 border rounded-xl text-dark bg-light hover:bg-dark hover:text-white"
            onClick={() => navigate('/animals')}
          >
            查看更多
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
