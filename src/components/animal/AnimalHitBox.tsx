import { Highlight, Snippet } from 'react-instantsearch-hooks-web';
import { Link } from 'react-router-dom';
import { SimpleAnimalHit } from '../../types/animal';

interface AnimalHitBoxProps {
  hit: SimpleAnimalHit;
}

function AnimalHitBox({ hit }: AnimalHitBoxProps) {
  return (
    <div className="mt-5">
      <Link to={`/animal/${hit.objectID}`}>
        <div className="rounded-full w-28 h-28 sm:w-36 sm:h-36 border-2 overflow-hidden mx-auto">
          <img
            src={hit.mainPic}
            alt="img"
            className="h-full mx-auto object-cover object-center"
          />
        </div>
        <div className="mt-3 text-center">
          <Highlight hit={hit} attribute="name" />
          <br />
          <Highlight hit={hit} attribute="latinName" className="text-xs" />
          <br />
          <Highlight hit={hit} attribute="class" />
          <Highlight hit={hit} attribute="order" />
          <Highlight hit={hit} attribute="family" />
        </div>
        {/* <Snippet hit={hit} attribute="feature" className="text-sm" /> */}
      </Link>
    </div>
  );
}

export default AnimalHitBox;
