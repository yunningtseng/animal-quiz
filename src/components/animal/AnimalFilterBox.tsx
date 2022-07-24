import { RefinementList } from 'react-instantsearch-hooks-web';
import ClearFilterButton from './ClearFilterButton';
import CurrentFilterBox from './CurrentFilterBox';
import TaxonomicBox from './TaxonomicBox';

function AnimalFilterBox() {
  return (
    <div className="flex justify-between mt-5">
      <div className="text-sm w-60">
        <ClearFilterButton />
        <CurrentFilterBox />
        <TaxonomicBox />
        <RefinementList
          attribute="conservation"
          className="p-3 rounded-lg mt-5 border"
          classNames={{
            list: 'relative',
            item: 'mt-2 hover:bg-primary',
            selectedItem: 'bg-primary font-bold',
            label: 'flex items-center',
            checkbox: 'mr-1',
            labelText: '',
            count:
              'text-xs w-7 h-5 border rounded-xl px-1 text-center absolute right-0',
          }}
        />
      </div>
    </div>
  );
}

export default AnimalFilterBox;
