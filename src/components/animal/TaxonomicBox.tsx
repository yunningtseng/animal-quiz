import { HierarchicalMenuItem } from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu';
import { useEffect, useState } from 'react';
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

function TaxonomicBox() {
  const { items, refine } = useHierarchicalMenu({
    attributes: ['class', 'classOrder', 'classOrderFamily'],
    sortBy: ['count', 'name:asc'],
  });
  const [hidden, setHidden] = useState(false);

  // useEffect(() => {
  //   refine('鳥綱');
  // }, [refine]);

  function buildItems(items1: HierarchicalMenuItem[], isTop: boolean) {
    return (
      <ul className={isTop ? '' : 'ml-4'}>
        {items1.map((item) => (
          <li className="mt-2" key={item.value}>
            <button
              className="w-full"
              type="button"
              onClick={() => {
                refine(item.value);
              }}
            >
              <span className="flex justify-between">
                <span
                  className={item.isRefined ? 'text-secondary font-bold' : ''}
                >
                  {item.label}
                </span>
                <span
                  className={`text-xs w-7 h-5 border rounded-xl px-1 text-center ${
                    item.isRefined ? 'text-secondary font-bold' : ''
                  }`}
                >
                  {item.count}
                </span>
              </span>
            </button>
            {item.data && buildItems(item.data, false)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="p-3 rounded-lg mt-5 border">
      <h3 className="font-bold">生物分類</h3>
      <button
        type="button"
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        toggle expand
      </button>
      {!hidden && buildItems(items, true)}
    </div>
  );
}

export default TaxonomicBox;
