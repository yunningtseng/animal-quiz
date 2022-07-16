import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AnimalBox from '../components/animal/AnimalBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearState, fetchAnimal } from '../store/animalSlice';
import { RootState } from '../store/store';

const animalSelector = createStructuredSelector({
  isGetAnimal: (state: RootState) => state.animal.isGetAnimal,
});

function AnimalPage() {
  const { animalId } = useParams();
  const dispatch = useAppDispatch();
  const { isGetAnimal } = useAppSelector(animalSelector);
  const navigate = useNavigate();

  // - 先確認有沒有 fetch 到動物，若沒有則轉跳到錯誤頁面
  useEffect(() => {
    if (!isGetAnimal) {
      navigate('*');
      dispatch(clearState());
    }
  }, [isGetAnimal, navigate, dispatch]);

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
