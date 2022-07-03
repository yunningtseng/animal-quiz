import { useClearRefinements } from 'react-instantsearch-hooks-web';

function ClearFilterButton() {
  const { refine, canRefine } = useClearRefinements();

  return (
    <div>
      {/* * canRefine: 是否有篩選 */}
      {canRefine && (
        <div className="flex border border-text rounded-xl px-3 py-1 items-center font-bold hover:bg-primary cursor-pointer">
          <button
            type="button"
            className=""
            // * 執行 refine，清空篩選
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
