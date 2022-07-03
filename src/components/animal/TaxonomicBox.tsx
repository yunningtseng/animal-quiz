import { HierarchicalMenuItem } from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu';
import { useEffect, useState } from 'react';
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useParams } from 'react-router-dom';

function TaxonomicBox() {
  const { className, order, family } = useParams();
  const { items, refine } = useHierarchicalMenu({
    attributes: ['class', 'classOrder', 'classOrderFamily'],
    // * 位置排序的權重
    sortBy: ['count', 'name:asc'],
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let searchStr = '';
    if (className) {
      searchStr += className;
    }
    if (order) {
      searchStr += ' > ';
      searchStr += order;
    }
    if (family) {
      searchStr += ' > ';
      searchStr += family;
    }
    if (searchStr) {
      refine(searchStr);
    }
  }, [refine, className, order, family]);

  // * 只有最上層的 isTop 為 true
  function buildItems(items1: HierarchicalMenuItem[], isTop: boolean) {
    return (
      <ul className={isTop ? '' : 'ml-4'}>
        {items1.map((item) => (
          <li className="mt-2 " key={item.value}>
            <button
              className="w-full"
              type="button"
              onClick={() => {
                refine(item.value);
              }}
            >
              <span
                className={`flex justify-between hover:bg-primary ${
                  item.isRefined ? 'font-bold bg-primary' : ''
                }`}
              >
                <span className={item.isRefined ? 'font-bold bg-primary' : ''}>
                  {item.label}
                </span>
                <span
                  className={`text-xs w-7 h-5 border rounded-xl px-1 text-center ${
                    item.isRefined ? 'font-bold bg-primary' : ''
                  }`}
                >
                  {item.count}
                </span>
              </span>
            </button>
            {/* - 若 item.data 不為空，則執行 buildItems() */}
            {item.data && buildItems(item.data, false)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="p-3 rounded-lg mt-3 border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-secondary">生物分類</h3>
        <button
          type="button"
          className="border rounded-lg px-2 hover:bg-primary"
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          {hidden ? <MdExpandMore /> : <MdExpandLess />}
        </button>
      </div>
      {/* * 觸發 buildItems */}
      {!hidden && buildItems(items, true)}
    </div>
  );
}

export default TaxonomicBox;
