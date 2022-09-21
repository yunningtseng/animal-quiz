import { useClearRefinements } from 'react-instantsearch-hooks-web';
import { useNavigate } from 'react-router-dom';

function ClearFilterButton() {
  const { refine, canRefine } = useClearRefinements();
  const navigate = useNavigate();

  return (
    <div>
      {canRefine && (
        <div className="flex border border-text rounded-xl px-3 py-1 items-center font-bold hover:bg-primary cursor-pointer">
          <button
            type="button"
            className=""
            onClick={() => {
              refine();
              navigate('/animals');
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
