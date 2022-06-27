import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../types/user';
import banner from '../../images/banner.png';

function Home() {
  const rankingList: User[] = useAppSelector(
    (state) => state.ranking.rankingList,
  );
  const navigate = useNavigate();
  return (
    <div className="w-225 mx-auto mt-5">
      <div className="flex justify-between">
        <div className="relative">
          <button
            type="button"
            className="absolute top-3 left-1/4 font-bold text-2xl"
            onClick={() => navigate('/quiz')}
          >
            開始來挑戰吧
          </button>
          <img src={banner} alt="img" className="w-96" />
        </div>

        <div className="w-52 mx-10 border ">
          <div className="bg-black text-white font-bold text-center py-1">
            排行榜
          </div>
          <div className="px-3">
            {rankingList.map((user, index) => (
              <div key={user.id} className="my-1.5">
                {`Top ${index + 1}`}
                <span className="mr-1">: </span>
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between mb-10">
          <img
            src="https://www.zoo.gov.tw/iTAP/03_Animals/PangolinDome/0_PangolinDome/LTS/Linnaeus'sTwo_toedSloth01.JPG"
            alt="img"
            className="w-125 h-80 bg-contain rounded-lg"
          />
          <div className="w-72 p-5 text-lg rounded-md border">
            <div className="mb-3">哺乳類</div>
            <div className="mb-5">Mammals</div>
            <button
              type="button"
              className="text-sm"
              onClick={() => navigate('/animals')}
            >
              查看更多
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-10">
          <div className="w-72 p-5 text-lg rounded-md border">
            <div className="mb-3">鳥類</div>
            <div className="mb-5">Birds</div>
            <button
              type="button"
              className="text-sm"
              onClick={() => navigate('/animals')}
            >
              查看更多
            </button>
          </div>
          <img
            src="http://www.zoo.gov.tw/iTAP/03_Animals/BirdWorld/Toucan/Toucan_Pic01.jpg"
            alt="img"
            className="w-125 h-88 rounded-lg"
          />
        </div>

        <div className="flex justify-between">
          <img
            src="https://www.zoo.gov.tw/iTAP/03_Animals/InsectHouse/0_InsectHouse/LBSMB/LiuchiouBlueSpottedMilkweedButterfly.jpg"
            alt="img"
            className="w-125 h-88 rounded-lg"
          />
          <div className="w-72 p-5 text-lg rounded-md border">
            <div className="mb-3">變溫動物</div>
            <div className="mb-5">Ectotherms</div>
            <button
              type="button"
              className="text-sm"
              onClick={() => navigate('/animals')}
            >
              查看更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
