import { useParams } from 'react-router-dom';
import Animal from '../components/animal/Animal';
import { useAppSelector } from '../hooks/redux';
import { AnimalState } from '../store/animalSlice';

function AnimalPage() {
  const animals: AnimalState = useAppSelector((state) => state.animal);

  const params = useParams();
  const animalId = params;

  return (
    <div className="flex w-3/4 mx-auto mt-5">
      {/* <Animal animalId={animalId} animals={animals} /> */}
      <Animal animals={animals} />
    </div>
  );
}

export default AnimalPage;
