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
    <div className="w-225 mx-auto px-10 mt-10">
      <p className="text-3xl">快來探索動物吧!</p>

      <InstantSearch searchClient={searchClient} indexName="animals">
        <SearchAnimalBox />
        <ClearRefinements />
        <HierarchicalMenu
          attributes={['class', 'classOrder', 'classOrderFamily']}
          sortBy={['count', 'name:asc']}
          className="w-80 p-3 rounded-lg bg-light focus:outline-none mt-5"
          classNames={{
            list: '',
            item: '',
            selectedItem: 'pl-6',
            parentItem: '',
            link: '',
            label: '',
            count: 'pl-3',
          }}
        />
        <RefinementList
          attribute="conservation"
          className="w-80 p-3 rounded-lg bg-light focus:outline-none mt-5"
          classNames={{
            list: '',
            item: '',
            selectedItem: 'bg-yellow-200',
            label: '',
            checkbox: '',
            labelText: '',
            count: 'pl-3',
          }}
        />
        <Menu
          attribute="location"
          sortBy={['count', 'name:asc']}
          className="w-80 p-3 rounded-lg bg-light focus:outline-none mt-5"
          classNames={{
            list: '',
            item: '',
            selectedItem: 'bg-yellow-200',
            link: '',
            label: '',
            count: 'pl-3',
          }}
        />
        <AnimalHitBoxList />
      </InstantSearch>
    </div>
  );
}

export default AnimalsPage;
