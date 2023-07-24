import BasicTimer from "./basic_timer.js";

export default class TimerManager {
  constructor() {
    this.list = [];
  }

  createBaiscTimer(name, setValue) {
    const timer = new BasicTimer(name, setValue);
    this.list.push(timer);
    return timer;
  }

  createSequentialTimer(name) {
    
  }

  remove(timer) {
    const idx = this.list.indexOf(timer);
    if(idx < 0) return;
    this.list.splice(idx,1);
  }
}