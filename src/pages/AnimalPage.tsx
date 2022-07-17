import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AnimalBox from '../components/animal/AnimalBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearState, fetchAnimal } from '../store/animalSlice';
import { RootState } from '../store/store';

const animalSelector = createStructuredSelector({
  isLoading: (state: RootState) => state.animal.isLoading,
  animalNotFound: (state: RootState) => state.animal.animalNotFound,
});

let previousAnimalId = '';

function AnimalPage() {
  const { animalId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, animalNotFound } = useAppSelector(animalSelector);
  const navigate = useNavigate();

  // - 先確認有沒有 fetch 到動物，若沒有則轉跳到錯誤頁面
  useEffect(() => {
    if (animalNotFound) {
      navigate('/not-found');
      dispatch(clearState());
    }
  }, [animalNotFound, navigate, dispatch]);

  useEffect(() => {
    dispatch(fetchAnimal(animalId ?? ''));
  }, [dispatch, animalId]);

  // * previousAnimalId !== animalId 只有在剛進入這個頁面時會是 true
  if (previousAnimalId !== animalId || isLoading) {
    previousAnimalId = animalId ?? '';
    return (
      <div className="flex justify-center mt-60">
        <Box>
          <CircularProgress color="warning" />
        </Box>
      </div>
    );
  }

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10">
      <AnimalBox />
    </div>
  );
}

export default AnimalPage;
