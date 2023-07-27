export default class BasicTimer {
  #counter;
  #isRunning;
  #dt;
  #init;
  constructor() {
    this.#dt = 0;
    this.#init = 0;
    this.#isRunning = false;
    this.setTime = null;
    console.log("basic timer constructor")
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#dt = end - now;
      if (this.#dt <= 0) {
        clearInterval(this.#counter);
        this.#isRunning = false;
        this.#dt = 0;
      }
      this.setView();
    }, 10);
  }

  start() {
    if(this.#isRunning) return;
    this.#isRunning = true;
    const end = new Date().getTime() + this.#dt;
    this.#count(end);
    console.log(`start: ${this.#dt}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    console.log(`pause: ${this.#dt}`);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if(time != null) {
      this.#init = time;
      this.#dt = time;
    }
    else {
      this.#dt = this.#init;
    }
    this.setView();
    console.log(`reset: ${this.#dt}`);
  }

  isRunning() {
    return this.#isRunning;
  }

  getTime() {
    return this.#dt;
  }

  setView() {
    this.setTime(this.#dt);
  }
}