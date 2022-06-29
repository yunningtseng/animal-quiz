import { useState } from 'react';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import AnimalFilterBox from '../components/animal/AnimalFilterBox';
import AnimalHitBoxList from '../components/animal/AnimalHitBoxList';
import SearchAnimalBox from '../components/animal/SearchAnimalBox';
import { searchClient } from '../utils/algolia';

function AnimalsPage() {
  const [expand, isExpand] = useState(false);
  const [filter, isFilter] = useState(false);

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-10 p-3 relative">
      <p className="text-3xl">快來探索動物吧!</p>
      <InstantSearch searchClient={searchClient} indexName="animals">
        <div className="flex justify-between mt-5 items-center">
          {!filter && (
            <button
              type="button"
              className="lg:hidden border px-2 rounded-2xl h-8 mr-3"
              onClick={() => {
                isFilter((prevState) => !prevState);
                isExpand((prevState) => !prevState);
              }}
            >
              filter
            </button>
          )}
          {filter && (
            <button
              type="button"
              className="lg:hidden border px-2 rounded-2xl h-8 mr-3"
              onClick={() => {
                isFilter((prevState) => !prevState);
                isExpand((prevState) => !prevState);
              }}
            >
              返回
            </button>
          )}
          <SearchAnimalBox />
        </div>

        <div className="flex justify-between">
          <div
            className={`${
              expand
                ? 'flex absolute z-20 bg-white w-screen'
                : 'hidden'
            } lg:flex`}
          >
            <AnimalFilterBox />
          </div>

          <AnimalHitBoxList />
        </div>
      </InstantSearch>
    </div>
  );
}

export default AnimalsPage;
