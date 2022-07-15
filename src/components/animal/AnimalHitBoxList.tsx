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

  if (hits.length === 0) {
    return <div className="w-[18rem] sm:w-[30rem] md:w-[46rem] lg:w-[30rem] xl:w-[40rem] text-center lg:text-start mt-10 text-base sm:text-xl text-dark font-bold">查無動物，請換個關鍵字進行搜尋!</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {hits.map((e, index) => (
        <AnimalHitBox key={index} hit={e} />
      ))}
      <div ref={targetRef} />
    </div>
  );
}

export default AnimalHitBoxList;
