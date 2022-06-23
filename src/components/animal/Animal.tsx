import { useAppSelector } from '../../hooks/redux';
import { Animal } from '../../types/animal';

function AnimalBox() {
  const animal: Animal = useAppSelector((state) => state.animal.animal);

  if (!animal.id) {
    return <div />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <img src={animal.mainPic} alt="img" className="w-1/2" />
        <div className="pr-20">
          <div>
            <p className="text-4xl">{animal.nameCh}</p>
            <p>{animal.nameEn}</p>
          </div>
          <div className="flex">
            綱目:
            <p>{animal.class}</p>
            <p>{animal.order}</p>
          </div>
          <div>
            科:
            {animal.family}
          </div>
          <div>
            保育分級：
            {animal.conservation}
          </div>
          <div />
        </div>
      </div>
      <div>
        棲息地:
        {animal.habitat}
      </div>
      <div>
        特徵:
        {animal.feature.map((feature, index) => (
          <div key={index}>{feature}</div>
        ))}
      </div>
      <div>
        飲食:
        {animal.diet}
      </div>
    </div>
  );
}

export default AnimalBox;
