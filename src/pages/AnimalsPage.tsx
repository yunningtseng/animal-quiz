import AnimalList from '../components/animal/AnimalList';

function AnimalsPage() {
  return (
    <div>
      <div>圖片</div>
      <div className="w-3/4 mx-auto">
        <div>快來探索動物吧</div>
        <div className="flex justify-between">
          <div>
            <select className="w-80 p-3 rounded-lg bg-primary">
              <option>所有動物</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
          </div>
          <div>
            <input
              className="w-80 p-3 rounded-lg bg-primary"
              placeholder="請輸入關鍵字"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4" />
        <AnimalList />
      </div>
    </div>
  );
}

export default AnimalsPage;
