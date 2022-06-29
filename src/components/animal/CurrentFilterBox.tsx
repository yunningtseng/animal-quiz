import { useCurrentRefinements } from 'react-instantsearch-hooks-web';

function CurrentFilterBox() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { items, refine } = useCurrentRefinements();

  // console.log(items);

  return (
    <div>
      {items.map((item) => item.refinements.map((e, index) => (
        <button
          type="button"
          key={index}
          onClick={() => {
            refine(e);
          }}
        >
          {e.value}
        </button>
      )))}
    </div>
  );
}

export default CurrentFilterBox;
