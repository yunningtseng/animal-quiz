import { useAppSelector } from '../../hooks/redux';
import { Animal } from '../../types/animal';
import conservation from '../../images/conservation.jpg';

function AnimalBox() {
  const animal: Animal = useAppSelector((state) => state.animal.animal);

  if (!animal.id) {
    return <div />;
  }

  return (
    <div>
      <div className="md:flex justify-between">
        <img
          src={animal.mainPic}
          alt="img"
          className="w-full h-full md:w-1/2 lg:w-2/3 rounded-lg object-center object-cover"
        />
        <div className="w-full mt-5 md:mt-0 ml-0 sm:ml-5 tracking-wider font-bold  text-text">
          <div>
            <p className="mt-5 sm:mt-0 text-3xl lg:text-4xl">{animal.name}</p>
            <p className="text-lg lg:text-xl mt-3">{animal.enName}</p>
            <p className="text-lg lg:text-xl mt-3 italic">{animal.latinName}</p>
          </div>
          <div className="mt-8 text-xl">
            <p className="mt-3">{animal.class}</p>
            <p className="mt-3">{animal.order}</p>
            <p className="mt-3">{animal.family}</p>
            {animal.conservation !== '' ? (
              <div>
                <p className="mt-3">{`保育分級: ${animal.conservation}`}</p>
                <img
                  src={conservation}
                  alt="img"
                  className="w-full rounded-lg object-center object-cover mt-3"
                />
              </div>
            ) : (
              <div />
            )}
          </div>
          <div />
        </div>
      </div>

      <div className="my-5 sm:my-10 text-lg tracking-wider font-bold  text-text-light border-y-2">
        <div className="flex">
          {animal.alsoknown.length !== 0 ? (
            <div className="mt-3">
              <span className="mr-3 text-text-dark">別稱:</span>
              {animal.alsoknown.map((alsoknown, index) => (
                <div key={index}>
                  <span>- </span>
                  {alsoknown}
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>

        {animal.diet.length !== 0 ? (
          <div className="my-3">
            <span className="mr-3 text-text-dark">飲食:</span>
            {animal.diet.map((diet, index) => (
              <div key={index}>
                <span>- </span>
                {diet}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
        {animal.habitat.length !== 0 ? (
          <div className="my-3">
            <span className="mr-3 text-text-dark">棲息地:</span>
            {animal.habitat.map((habitat, index) => (
              <div key={index}>
                <span>- </span>
                {habitat}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
        {animal.feature.length !== 0 ? (
          <div className="my-3">
            <span className="mr-3 text-text-dark">特徵:</span>
            {animal.feature.map((feature, index) => (
              <div key={index}>
                <span>- </span>
                {feature}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
        {animal.behavior.length !== 0 ? (
          <div className="my-3">
            <span className="mr-3 text-text-dark">行為:</span>
            {animal.behavior.map((behavior, index) => (
              <div key={index}>
                <span>- </span>
                {behavior}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
        {animal.crisis.length !== 0 ? (
          <div className="my-3">
            <span className="mr-3 text-text-dark">危機:</span>
            {animal.crisis.map((crisis, index) => (
              <div key={index}>
                <span>- </span>
                {crisis}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="mt-10">
        {animal.pics.map((pic, index) => (
          <img
            key={index}
            src={pic}
            alt="img"
            className="w-2/3 rounded-lg mt-3"
          />
        ))}
      </div>
    </div>
  );
}

export default AnimalBox;
