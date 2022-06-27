import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimalBox from '../components/animal/AnimalBox';
import { useAppDispatch } from '../hooks/redux';
import { fetchAnimal } from '../store/animalSlice';

function AnimalPage() {
  const { animalId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnimal(animalId ?? ''));
  }, [dispatch, animalId]);

  return (
    <div className="flex max-w-4xl mx-auto mt-5">
      <AnimalBox />
    </div>
  );
}

export default AnimalPage;
