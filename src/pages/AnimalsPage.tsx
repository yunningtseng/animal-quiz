// import { useEffect } from 'react';
import AnimalList from '../components/animal/AnimalList';
// import { useAppDispatch } from '../hooks/redux';
// import { setAnimals } from '../store/animalSlice';

function AnimalsPage() {
  return (
    <div className="w-225 mx-auto px-10 mt-10">
      <p className="text-3xl">快來探索動物吧!</p>

      <div className="flex justify-between items-center mt-5">
        <div>
          <select className="w-80 p-3 rounded-lg bg-light focus:outline-none">
            <option>所有動物</option>
            <option>哺乳綱</option>
            <option>昆蟲綱</option>
            <option>爬蟲綱</option>
            <option>唇竹綱</option>
            <option>蛛形綱</option>
            <option>鳥綱</option>
            <option>軟骨魚綱</option>
            <option>硬骨魚綱</option>
          </select>
        </div>

        <div>
          <input
            className="w-80 p-3 rounded-lg bg-light focus:outline-none"
            placeholder="請輸入關鍵字"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4" />
      <AnimalList />
    </div>
  );
}

export default AnimalsPage;
