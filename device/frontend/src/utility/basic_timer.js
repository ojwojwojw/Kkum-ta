export default class BasicTimer {
  #counter;
  #gap
  #init
  constructor(name,setValue) {
    this.dt = 0;
    this.#gap = 0;
    this.#init = 0;
    this.name = name;
    this.setValue = setValue;
    this.isRunning = false;
    console.log("basic timer constructor")
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.dt = end - now;
      if (this.dt <= 0) {
        clearInterval(this.#counter);
        this.isRunning = false;
        this.dt = 0;
        this.#gap = 0;
      }
      this.setValue(this.dt);
      //console.log(`${this.name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 10);
  }

  start() {
    if(this.isRunning === true) return;
    this.isRunning = true;
    const end = new Date().getTime() + this.#gap;
    this.#count(end);
    console.log(`start: ${this.#gap}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.isRunning = false;
    this.#gap = this.dt;
    console.log(`pause: ${this.#gap}`);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.isRunning = false;
    if(time != null) {
      this.#init = time;
      this.#gap = time;
      this.dt = time;
    }
    else {
      this.dt = this.#init;
      this.#gap = this.#init;
    }
    this.setValue(this.dt);
    console.log(`reset: ${this.#gap}`);
  }
}