let interval: NodeJS.Timer;
let step = 1;
let onChange: () => void;

const quizTimer = {
  time: 0,

  start(onTimeChange: () => void, initial: number) {
    this.time = initial;
    step = initial === 0 ? 1 : -1;
    onChange = onTimeChange;
    this.resume();
  },
  pause() {
    clearInterval(interval);
  },
  resume() {
    clearInterval(interval);
    interval = setInterval(() => {
      this.time += step;
      onChange();
    }, 1000);
  },
  reset() {
    clearInterval(interval);
    this.time = 0;
  },
};

export default quizTimer;
