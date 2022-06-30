import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAnimals } from '../../store/animalSlice';

function AnimalClass() {
  const animalClass: string[] = useAppSelector((state) => state.animal.class);
  const dispatch = useAppDispatch();

  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <select
        className="w-80 p-3 rounded-lg bg-light focus:outline-none"
        ref={selectRef}
        onChange={() => {
          dispatch(fetchAnimals(selectRef.current?.value ?? ''));
        }}
      >
        {animalClass.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AnimalClass;
