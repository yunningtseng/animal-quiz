import { Highlight, Snippet } from 'react-instantsearch-hooks-web';
import { Link } from 'react-router-dom';
import IMG_BASE_URL from '../../api/url';
import { SimpleAnimalHit } from '../../types/animal';

interface AnimalHitBoxProps {
  hit: SimpleAnimalHit;
}

function AnimalHitBox({ hit }: AnimalHitBoxProps) {
  return (
    <div className="mt-5">
      <Link to={`/animal/${hit.objectID}`}>
        <div className="rounded-full w-32 h-32 xs:w-36 xs:h-36 border-2 overflow-hidden mx-auto">
          {hit.thumbnail && (
            <img
              src={IMG_BASE_URL + hit.thumbnail}
              alt="img"
              className="h-full mx-auto object-cover object-center"
            />
          )}
        </div>
      </Link>
      <div className="mt-3 text-center">
        <Highlight hit={hit} attribute="name" />
        <br />
        <Highlight hit={hit} attribute="latinName" className="text-xs" />
        <br />
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20"
        >
          {hit.class}
        </button>
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20"
        >
          {hit.order}
        </button>
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20"
        >
          {hit.family}
        </button>
      </div>
    </div>
  );
}

export default AnimalHitBox;
