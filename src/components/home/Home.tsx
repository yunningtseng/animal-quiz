import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
} from '../../store/counterSlice';

function Home() {
  const count: number = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="bg-yellow-500 ps-4 pt-5">我</div>
      <div className="bg-blue-500 text-center">是</div>
      <div className="bg-black text-center text-white">home</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <div>
          <button type="button" onClick={() => dispatch(decrement())}>
            -
          </button>
          <span>{count}</span>
          <button type="button" onClick={() => dispatch(increment())}>
            +
          </button>
        </div>
        <div>
          <button type="button" onClick={() => dispatch(incrementByAmount(5))}>
            Add Amount
          </button>
          <button type="button" onClick={() => dispatch(incrementAsync(5))}>
            Add Async
          </button>
          <button type="button" onClick={() => dispatch(incrementIfOdd(5))}>
            Add If Odd
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
