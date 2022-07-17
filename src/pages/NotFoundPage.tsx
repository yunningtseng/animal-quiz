import sloth from '../images/sloth.png';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center max-w-xs sm:max-w-lg mt-10 mx-auto">
      <img src={sloth} alt="img" className="w-[20rem] object-cover mx-auto" />
      <p className="mt-10 text-2xl text-secondary font-bold">找不到頁面，但你找到我了!</p>
    </div>
  );
}

export default NotFoundPage;
