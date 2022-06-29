import { useClearRefinements } from 'react-instantsearch-hooks-web';

function ClearFilterButton() {
  const { refine, canRefine } = useClearRefinements();

  return (
    <div>
      {canRefine && (
        <button
          type="button"
          onClick={() => {
            refine();
          }}
        >
          清除所有篩選
        </button>
      )}
    </div>
  );
}

export default ClearFilterButton;
