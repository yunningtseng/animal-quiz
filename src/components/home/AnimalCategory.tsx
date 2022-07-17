import { Link } from 'react-router-dom';
import IMG_BASE_URL from '../../api/url';

function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-5">
      <Link to="/animals/哺乳綱">
        <div className="flex flex-col mb-10 cursor-pointer">
          <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg shadow-xl overflow-hidden">
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
          </div>
        </div>
      </Link>

      <Link to="/animals/鳥綱">
        <div className="flex flex-col mb-10 cursor-pointer">
          <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg shadow-xl overflow-hidden">
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
          </div>
        </div>
      </Link>

      <Link to="/animals/昆蟲綱">
        <div className="flex flex-col mb-10 cursor-pointer">
          <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg shadow-xl overflow-hidden">
            <img
              src={`${IMG_BASE_URL}Ideopsis-similis-01.jpg`}
              alt="img"
              className="w-full h-full object-center object-cover"
            />
          </div>

          <div className="flex flex-col text-dark font-bold mt-5 px-1">
            <span className="text-center text-lg sm:text-xl mb-3">
              昆蟲類 / Insects
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
