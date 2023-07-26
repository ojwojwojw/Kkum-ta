import { logData } from "../features/timer/timerSlice";

export default class BasicTimer {
  #counter;
  #data;
  #isRunning;
  constructor(index,setValue,dispatch) {
    this.#data = {};
    this.#data.dt = 0;
    this.#data.init = 0;
    this.#data.index = index;
    this.#isRunning = false;
    this.setValue = setValue;
    this.dispatch = dispatch;
    console.log("basic timer constructor")
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#data.dt = end - now;
      if (this.#data.dt <= 0) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        this.#data.dt = 0;
      }
      this.setValue(this.#data.dt);
      this.dispatch(logData({ data : JSON.stringify(this.#data), index : this.#data.index}));
      //console.log(`${this.#id}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 10);
  }

  start() {
    if(this.#isRunning) return;
    this.#isRunning = true;
    const end = new Date().getTime() + this.#data.dt;
    this.#count(end);
    console.log(`start: ${this.#data.dt}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    console.log(`pause: ${this.#data.dt}`);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if(time != null) {
      this.#data.init = time;
      this.#data.dt = time;
    }
    else {
      this.#data.dt = this.#data.init;
    }
    this.setValue(this.#data.dt);
    this.dispatch(logData({ data : JSON.stringify(this.#data), index : this.#data.index}));
    console.log(`reset: ${this.#data.dt}`);
  }

  isRunning() {
    return this.#isRunning;
  }

  getTime() {
    return this.#data.dt;
  }

  setID(id) {
    this.#data.id = id;
  }

  importFromJSON(data) {
    if(this.#isRunning) return;
    this.#data = JSON.parse(data);
  }
}