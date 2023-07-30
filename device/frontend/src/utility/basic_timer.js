export default class BasicTimer {
  #counter;
  #isRunning;
  #time;
  #initTime;
  #tagTime;
  #idx;
  #maxIter;
  #iter;
  constructor() {
    this.#initTime = [10 * 1000, 15 * 1000, 12 * 1000];
    this.#tagTime = this.#initTime;
    this.#time = this.#initTime[0];
    this.#idx = 0;
    this.#isRunning = false;
    this.#iter = 0;
    this.#maxIter = 0;
    this.setTime = null;
    this.setIsRunning = null;
    this.setProgress = null;
    console.log("basic timer constructor")
  }

  #determine() {
    if (this.#idx + 1 < this.#initTime.length) {
      this.#time = this.#initTime[++this.#idx];
      this.start();
      return;
    }
    if (this.#maxIter == 0 || this.#iter + 1 < this.#maxIter) {
      this.#time = this.#initTime[0];
      this.#idx = 0;
      if(this.#maxIter > 0) this.#iter++;
      this.start();
      return;
    }
    this.#time = 0;
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#time = end - now;
      if (this.#time <= 0) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        if (this.setIsRunning != null) this.setIsRunning(false);
        this.#determine();
      }
      if (this.setTime != null) this.setTime(this.#time);
      if (this.setProgress != null) this.setProgress(1 - this.#time / this.#initTime[this.#idx]);
    }, 31);
  }

  start() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    if (this.setIsRunning != null) this.setIsRunning(true);
    const end = new Date().getTime() + this.#time;
    this.#count(end);
    console.log(`start: ${this.#time}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null) this.setIsRunning(false);
    console.log(`pause: ${this.#time}`);
  }

  reset(initTime, maxIter) { // 밀리초 단위 배열로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null) this.setIsRunning(false);
    if (initTime != null) this.#initTime = initTime;
    if (maxIter != null) this.#maxIter = maxIter;
    this.#tagTime = initTime;
    this.#time = this.#initTime[0];
    this.#iter = 0;
    this.#idx = 0;
    if (this.setTime != null) this.setTime(this.#time);
    if (this.setProgress != null) this.setProgress(0);
    console.log(`reset: ${this.#time}`);
  }

  load(obj) {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null) this.setIsRunning(false);
    this.#time = obj.time;
    this.setTime(this.#time);
    if (this.setProgress != null) this.setProgress(0);
    this.#initTime = obj.initTime;
  }

  save() {
    return {
      time: this.#time,
      initTime: this.#initTime,
    }
  }
}