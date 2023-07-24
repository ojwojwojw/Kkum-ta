import BasicTimer from "./basic_timer.js";

export default class TimerManager { // singleton

  static cnt;

  constructor() {
    if (TimerManager.instance) {
      return TimerManager.instance;
    }
    TimerManager.instance = this;
    this.list = [];
    this.cnt = 0;
    console.log("time manager constructor")
  }

  createBaiscTimer(name, setValue) {
    const timer = new BasicTimer(name, setValue);
    this.list.push(timer);
    console.log(`남은 타이머 개수: ${++this.cnt}`);
    return timer;
  }

  createSequentialTimer(name) {

  }

  remove(timer) {
    const idx = this.list.indexOf(timer);
    if (idx < 0) return;
    this.list.splice(idx, 1);
    console.log(`남은 타이머 개수: ${--this.cnt}`);
  }
}
