import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AnimalState } from '../../store/animalSlice';

function AnimalList() {
  const animals: AnimalState = useAppSelector((state) => state.animal);

  function renderAnimalList() {
    return animals.animalList.map((animal) => (
      <div key={animal.id}>
        <Link to={`/animal/${animal.id}`}>
          <p>{animal.nameCh}</p>
        </Link>
      </div>
    ));
  }
  return (
    <div>
      <div className="w-3/4 mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {renderAnimalList()}
        </div>
      </div>
    </div>
  );
}

export default AnimalList;
