export default class BasicTimer {
  #counter;
  #dt
  #init
  #isRunning
  #name
  constructor(name,setValue) {
    this.#dt = 0;
    this.#init = 0;
    this.#isRunning = false;
    this.#name = name;
    this.setValue = setValue;
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
      this.setValue(this.#dt);
      //console.log(`${this.#name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 10);
  }

  start() {
    if(this.#isRunning === true) return;
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
    this.setValue(this.#dt);
    console.log(`reset: ${this.#dt}`);
  }

  isRunning() {
    return this.#isRunning;
  }

  getTime() {
    return this.#dt;
  }

  setName(name) {
    this.#name = name;
  }
}