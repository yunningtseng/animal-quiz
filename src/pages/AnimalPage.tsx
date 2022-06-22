import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimalBox from '../components/animal/Animal';
import { useAppDispatch } from '../hooks/redux';
import { setAnimal } from '../store/animalSlice';

function AnimalPage() {
  const { animalId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAnimal(animalId ?? ''));
  }, [dispatch, animalId]);

  return (
    <div className="flex w-3/4 mx-auto mt-5">
      <AnimalBox />
    </div>
  );
}

export default AnimalPage;
