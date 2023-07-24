export default class BasicTimer {
  #counter;
  constructor(name, setValue) {
    this.dt = 0;
    this.name = name;
    this.setValue = setValue;
    this.isRunning = 0;
    console.log("constructor")
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
      this.setValue(`${this.name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
      console.log(`${this.name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 0);
  }

  start() {
    if(this.isRunning === true) return;
    this.isRunning = true;
    console.log(`reset: ${this.dt}`);
    const end = new Date().getTime() + this.dt;
    this.#count(end);
  }

  pause() {
    clearInterval(this.#counter);
    this.isRunning = false;
  }

  reset(time) { // 밀리초 단위로 입력 받기
    this.pause();
    if(time != null) {
      this.dt = time;
      this.setValue(this.dt);
    }
    console.log(`reset: ${this.dt}`);
  }

  setStateSetter(setValue) {
    this.setValue = setValue;
  }
}