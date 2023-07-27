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
    console.log("basic timer constructor")
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#time = end - now;
      if (this.#time <= 0) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        this.#time = 0;
      }
      this.setTime(this.#time);
    }, 10);
  }

  start() {
    if(this.#isRunning) return;
    this.#isRunning = true;
    const end = new Date().getTime() + this.#time;
    this.#count(end);
    console.log(`start: ${this.#time}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    console.log(`pause: ${this.#time}`);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if(time != null) {
      this.#init = time;
      this.#time = time;
    }
    else {
      this.#time = this.#init;
    }
    this.setTime(this.#time);
    console.log(`reset: ${this.#time}`);
  }
}