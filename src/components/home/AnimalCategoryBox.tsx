import { Link } from 'react-router-dom';
import IMG_BASE_URL from '../../api/url';

interface AnimalCategoryProps {
  animalCategory: string;
}

const animalPic: { [key: string]: string } = {
  哺乳綱: 'Choloepus-didactylus',
  鳥綱: 'Ramphastos-toco',
  昆蟲綱: 'Ideopsis-similis',
};

const animalType: { [key: string]: string } = {
  哺乳綱: '哺乳類 / Mammals',
  鳥綱: '鳥類 / Birds',
  昆蟲綱: '昆蟲類 / Insects',
};

function AnimalCategory({ animalCategory }: AnimalCategoryProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-5">
      <Link to={`/animals/${animalCategory}`}>
        <div className="flex flex-col mb-10 cursor-pointer">
          <div className="md:w-52 md:h-44 lg:w-72 lg:h-60 xl:w-96 xl:h-72 rounded-lg shadow-xl overflow-hidden">
            <img
              src={`${IMG_BASE_URL}${animalPic[animalCategory]}-01.jpg`}
              alt="img"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="flex flex-col text-dark font-bold mt-5 px-1">
            <span className="text-center text-lg sm:text-xl mb-3">
              {animalType[animalCategory]}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AnimalCategory;
