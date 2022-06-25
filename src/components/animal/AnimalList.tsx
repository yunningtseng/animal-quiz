import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AnimalState } from '../../store/animalSlice';

function AnimalList() {
  const animals: AnimalState = useAppSelector((state) => state.animal);

  function renderAnimalList() {
    return animals.animalList.map((animal) => (
      <div key={animal.id} className="mt-5">
        <Link to={`/animal/${animal.id}`}>
          <div className="rounded-full w-28 h-28 sm:w-36 sm:h-36 border-2 overflow-hidden mx-auto">
            <img
              src={animal.mainPic}
              alt="img"
              className="h-full mx-auto object-cover object-center"
            />
          </div>
          <div className="mt-3">
            <p className="text-center">{animal.nameCh}</p>
          </div>
        </Link>
      </div>
    ));
  }
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {renderAnimalList()}
      </div>
    </div>
  );
}

export default AnimalList;
