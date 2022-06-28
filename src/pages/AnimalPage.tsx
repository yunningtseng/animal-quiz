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
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10">
      <AnimalBox />
    </div>
  );
}

export default AnimalPage;
