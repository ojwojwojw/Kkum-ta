export default class BasicStopwatch {
  #counter
  #time
  #init
  #begin
  #isRunning
  #limit;
  constructor() {
    this.#time = 0;
    this.#init = 0;
    this.#begin = 0;
    this.#isRunning = false;
    this.#limit = 360000 * 1000 - 1;
    this.setTime = null;
    this.setIsRunning = null;
    console.log("basic stopwatch constructor")
  }

  #count() {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#time = now - this.#begin + this.#init;
      if (this.#limit <= this.#time) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        if (this.setIsRunning != null)
          this.setIsRunning(false);
        this.#time = this.#limit;
      }
      if (this.setTime != null)
        this.setTime(this.#time);
    }, 31);
  }

  start() {
    if (this.#isRunning === true) return;
    this.#isRunning = true;
    if (this.setIsRunning != null)
      this.setIsRunning(true);
    this.#begin = new Date().getTime();
    this.#count();
    console.log(`start: ${this.#time}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null)
      this.setIsRunning(false);
    const now = new Date().getTime();
    this.#init += now - this.#begin;
    console.log(`pause: ${this.#time}`);
  }

  reset() { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null)
      this.setIsRunning(false);
    this.#time = 0;
    this.#init = 0;
    this.#begin = 0;
    if (this.setTime != null)
      this.setTime(this.#time);
    console.log(`reset: ${this.#time}`);
  }

  load(obj) {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null)
      this.setIsRunning(false);
    this.#time = obj.time;
    this.setTime(this.#time);
    this.#init = obj.init;
  }

  save() {
    return {
      time : this.#time,
      init : this.#init,
    }
  }
}