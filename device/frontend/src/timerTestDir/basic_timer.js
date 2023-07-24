export default class BasicTimer {
  #counter;
  constructor(name,setValue) {
    this.dt = 0;
    this.name = name;
    this.setValue = setValue;
    this.isRunning = 0;
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
      }
      this.setValue((this.dt / 1000).toFixed(2));
      //console.log(`${this.name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 10);
  }

  start() {
    if(this.isRunning === true) return;
    this.isRunning = true;
    const end = new Date().getTime() + this.dt;
    this.#count(end);
    console.log(`start: ${this.dt}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.isRunning = false;
    console.log("paused");
  }

  reset(time) { // 밀리초 단위로 입력 받기
    this.pause();
    if(time != null) {
      this.dt = time;
      this.setValue((this.dt / 1000).toFixed(2));
    }
    console.log(`reset: ${this.dt}`);
  }
}