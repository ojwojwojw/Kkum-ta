export default class BasicTimer {
  #counter;
  #isRunning;
  #time;
  #init;
  constructor() {
    this.#time = 0;
    this.#init = 0;
    this.#isRunning = false;
    this.setTime = null;
    this.setIsRunning = null;
    console.log("basic timer constructor")
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#time = end - now;
      if (this.#time <= 0) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        if (this.setIsRunning != null)
          this.setIsRunning(false);
        this.#time = 0;
      }
      if (this.setTime != null)
        this.setTime(this.#time);
    }, 10);
  }

  start() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    if (this.setIsRunning != null)
      this.setIsRunning(true);
    const end = new Date().getTime() + this.#time;
    this.#count(end);
    console.log(`start: ${this.#time}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null)
      this.setIsRunning(false);
    console.log(`pause: ${this.#time}`);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if (this.setIsRunning != null)
      this.setIsRunning(false);
    if (time != null && time > 0) {
      this.#init = time;
      this.#time = time;
    }
    else {
      this.#time = this.#init;
    }
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