import {
  ClearRefinements,
  HierarchicalMenu,
  InstantSearch,
  Menu,
  RefinementList,
} from 'react-instantsearch-hooks-web';
import AnimalHitBoxList from '../components/animal/AnimalHitBoxList';
import SearchAnimalBox from '../components/animal/SearchAnimalBox';
import { searchClient } from '../utils/algolia';

function AnimalsPage() {
  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10">
      <p className="text-3xl">快來探索動物吧!</p>
      <InstantSearch searchClient={searchClient} indexName="animals">
        <div className="flex justify-between mt-5">
          <SearchAnimalBox />
        </div>

        <div className="flex justify-between mt-5">
          <div className="text-sm w-56">
            <ClearRefinements />
            <HierarchicalMenu
              attributes={['class', 'classOrder', 'classOrderFamily']}
              sortBy={['count', 'name:asc']}
              className="p-3 rounded-lg mt-5 border"
              classNames={{
                list: '',
                item: 'mt-2',
                selectedItem: 'text-secondary text-bold',
                parentItem: '',
                link: 'flex justify-between',
                label: '',
                count: 'text-xs w-7 h-5 border rounded-xl px-1 text-center',
              }}
            />

            <RefinementList
              attribute="conservation"
              className="p-3 rounded-lg mt-5 border"
              classNames={{
                list: 'relative',
                item: 'mt-2',
                selectedItem: 'text-bold',
                label: '',
                checkbox: 'mr-1',
                labelText: '',
                count:
                  'text-xs w-7 h-5 border rounded-xl px-1 text-center absolute right-0',
              }}
            />
            <Menu
              attribute="location"
              sortBy={['count', 'name:asc']}
              className="p-3 rounded-lg mt-5 border"
              classNames={{
                list: '',
                item: 'mt-2',
                selectedItem: 'text-secondary text-bold',
                link: 'flex justify-between',
                label: '',
                count: 'text-xs w-7 h-5 border rounded-xl px-1 text-center',
              }}
            />
          </div>

          <AnimalHitBoxList />
        </div>
      </InstantSearch>
    </div>
  );
}

export default AnimalsPage;
