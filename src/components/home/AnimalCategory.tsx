import AnimalCategoryBox from './AnimalCategoryBox';

function AnimalCategory() {
  const animalCategoryList = ['哺乳綱', '鳥綱', '昆蟲綱'];

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-5">
      {animalCategoryList.map((animalCategory) => (
        <AnimalCategoryBox animalCategory={animalCategory} />
      ))}
    </div>
  );
}

export default AnimalCategory;
