import { motion } from 'framer-motion';
import { Highlight } from 'react-instantsearch-hooks-web';
import { Link, useNavigate } from 'react-router-dom';
import IMG_BASE_URL from '../../api/url';
import { SimpleAnimalHit } from '../../types/animal';
import owl from '../../images/owl.png';

interface AnimalHitBoxProps {
  hit: SimpleAnimalHit;
}

function AnimalHitBox({ hit }: AnimalHitBoxProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <Link to={`/animal/${hit.objectID}`}>
        <motion.div
          className="rounded-full w-32 h-32 xs:w-36 xs:h-36 border-2 overflow-hidden mx-auto"
          whileHover={{ scale: 1.13 }}
        >
          <img
            src={hit.thumbnail ? IMG_BASE_URL + hit.thumbnail : owl}
            alt="img"
            className="h-full mx-auto object-cover object-center"
          />
        </motion.div>
      </Link>
      <div className="mt-3 text-center">
        <Highlight hit={hit} attribute="name" />
        <br />
        <Highlight hit={hit} attribute="latinName" className="text-xs" />
        <br />
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20 hover:bg-light mr-0 md:mr-1 lg:mr-0 xl:mr-1"
          onClick={() => navigate(`/animals/${hit.class}`)}
        >
          {hit.class}
        </button>
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20 hover:bg-light"
          onClick={() => navigate(`/animals/${hit.class}/${hit.order}`)}
        >
          {hit.order}
        </button>
        <button
          type="button"
          className="border rounded-full px-2 text-xs mt-1 w-20 hover:bg-light"
          onClick={() => navigate(`/animals/${hit.class}/${hit.order}/${hit.family}`)}
        >
          {hit.family}
        </button>
      </div>
    </div>
  );
}

export default AnimalHitBox;
