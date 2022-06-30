import { useClearRefinements } from 'react-instantsearch-hooks-web';
import { BiFilter } from 'react-icons/bi';

function ClearFilterButton() {
  const { refine, canRefine } = useClearRefinements();

  return (
    <div>
      {canRefine && (
        <div className="flex border border-text rounded-xl px-3 py-1 items-center font-bold hover:bg-primary cursor-pointer">
          <BiFilter className="mr-3" />
          <button
            type="button"
            className=""
            onClick={() => {
              refine();
            }}
          >
            清除所有篩選
          </button>
        </div>
      )}
    </div>
  );
}

export default ClearFilterButton;
