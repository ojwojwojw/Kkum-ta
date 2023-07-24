export default class BasicTimer {
  #counter;
  constructor(name) {
    this.dt = 0;
    this.name = name;
  }

  #count(end) {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.dt = end - now;
      if (this.dt <= 0) {
        clearInterval(this.#counter);
        this.dt = 0;
      }
      console.log(`${this.name}: ${(this.dt / 1000).toFixed(3)} 초 남음`);
    }, 0);
  }

  start() {
    const end = new Date().getTime() + this.dt;
    this.#count(end);
  }

  pause() {
    clearInterval(this.#counter);
  }

  reset(time) { // 밀리초 단위로 입력 받기
    this.pause();
    if(time != null) {
      this.dt = time;
    }
    return this;
  }
}