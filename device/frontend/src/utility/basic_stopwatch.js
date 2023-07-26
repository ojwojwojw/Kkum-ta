export default class BasicStopwatch {
  #counter
  #dt
  #sum
  #begin
  #isRunning
  #name
  constructor(name,setValue) {
    this.#dt = 0;
    this.#sum = 0;
    this.#begin = 0;
    this.#isRunning = false;
    this.#name = name;
    this.setValue = setValue;
    console.log("basic stopwatch constructor")
  }

  #count() {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#dt = now - this.#begin + this.#sum;
      this.setValue(this.#dt);
      //console.log(`${this.#name}: ${(this.#dt / 1000).toFixed(3)} 초 지남`);
    }, 10);
  }

  start() {
    if(this.#isRunning === true) return;
    this.#isRunning = true;
    this.#begin = new Date().getTime();
    this.#count();
    console.log(`start: ${this.#dt}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    const now = new Date().getTime();
    this.#sum += now - this.#begin;
    console.log(`pause: ${this.#dt}`);
  }

  reset() { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#dt = 0;
    this.#sum = 0;
    this.#begin = 0;
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