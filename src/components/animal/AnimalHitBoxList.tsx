import { useEffect, useRef } from 'react';
import { useInfiniteHits } from 'react-instantsearch-hooks-web';
import { SimpleAnimalHit } from '../../types/animal';
import AnimalHitBox from './AnimalHitBox';

function AnimalHitBoxList() {
  const { hits, isLastPage, showMore } = useInfiniteHits<SimpleAnimalHit>();
  const targetRef = useRef(null);

  // console.log(hits);

  useEffect(() => {
    if (targetRef.current === null) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLastPage) {
          showMore();
        }
      });
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLastPage, showMore]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
      {hits.map((e, index) => (
        <AnimalHitBox key={index} hit={e} />
      ))}
      <div ref={targetRef} />
    </div>
  );
}

export default AnimalHitBoxList;
