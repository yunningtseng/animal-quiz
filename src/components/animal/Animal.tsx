import { AnimalState } from '../../store/animalSlice';

interface AnimalDetailProps {
  //   animalId: string;
  animals: AnimalState;
}

// function Animal({ animalId, animals }: AnimalDetailProps) {
function Animal({ animals }: AnimalDetailProps) {
  return (
    <div>
      <div className="flex justify-between">
        <img src={animals.animalList[0].mainPic} alt="img" className="w-1/2" />
        <div>
          <p>{animals.animalList[0].nameCh}</p>
          <p>{animals.animalList[0].nameEn}</p>
          <p>{animals.animalList[0].class}</p>
          <p>{animals.animalList[0].order}</p>
        </div>
        保育分級：
        {animals.animalList[0].conservation}
        <div />
      </div>
      <div>
        棲息地:
        {animals.animalList[0].habitat}
      </div>
    </div>
  );
}

export default Animal;
