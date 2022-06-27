import AnimalList from '../components/animal/AnimalList';
import AnimalClass from '../components/animal/AnimalClass';

function AnimalsPage() {
  return (
    <div className="w-225 mx-auto px-10 mt-10">
      <p className="text-3xl">快來探索動物吧!</p>

      <div className="flex justify-between items-center mt-5">
        <AnimalClass />

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
