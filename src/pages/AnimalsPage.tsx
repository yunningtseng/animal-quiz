import { InstantSearch } from 'react-instantsearch-hooks-web';
import { FiFilter } from 'react-icons/fi';
import AnimalFilterBox from '../components/animal/AnimalFilterBox';
import AnimalHitBoxList from '../components/animal/AnimalHitBoxList';
import SearchAnimalBox from '../components/animal/SearchAnimalBox';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilter } from '../store/animalSlice';
import { searchClient } from '../utils/algolia';

function AnimalsPage() {
  const dispatch = useAppDispatch();
  const showFilterBox: boolean = useAppSelector(
    (state) => state.animal.showFilterBox,
  );

  return (
    <div>
      {showFilterBox && (
        <div
          className="absolute top-0 left-0 z-20 w-screen h-full bg-black opacity-70 lg:hidden"
          aria-hidden="true"
          onClick={() => {
            dispatch(setFilter(false));
          }}
        />
      )}
      <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-10 p-3 relative">
        <p className="text-3xl">快來探索動物吧!</p>
        <InstantSearch searchClient={searchClient} indexName="animals">
          <div className="flex justify-between mt-5 items-center">
            <div
              className="flex lg:hidden text-text items-center justify-around sm:w-20 font-bold mr-3 cursor-pointer rounded-xl px-1 py-0.5 hover:bg-primary"
              onClick={() => {
                dispatch(setFilter(true));
              }}
              aria-hidden="true"
            >
              <FiFilter className="text-center" />
              <button type="button" className="ml-2 hidden sm:flex">
                篩選
              </button>
            </div>
            <SearchAnimalBox />
          </div>
          <div className="flex justify-between">
            <div
              className={`${
                showFilterBox
                  ? 'flex fixed z-30 left-0 top-0 w-auto h-full px-8 bg-white overflow-auto'
                  : 'hidden'
              } lg:flex lg:relative lg:z-0 lg:w-96 lg:px-0 lg:bg-transparent`}
            >
              <AnimalFilterBox />
            </div>
            <div>
              <AnimalHitBoxList />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default AnimalsPage;
