export default class BasicStopwatch {
  #counter
  #time
  #sum
  #begin
  #isRunning
  constructor() {
    this.#time = 0;
    this.#sum = 0;
    this.#begin = 0;
    this.#isRunning = false;
    this.setTime = null;
    this.setIsRunning = null;
    console.log("basic stopwatch constructor")
  }

  #count() {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#time = now - this.#begin + this.#sum;
      if(this.setTime != null)
        this.setTime(this.#time);
    }, 10);
  }

  start() {
    if(this.#isRunning === true) return;
    this.#isRunning = true;
    if(this.setIsRunning != null)
      this.setIsRunning(true);
    this.#begin = new Date().getTime();
    this.#count();
    console.log(`start: ${this.#time}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    if(this.setIsRunning != null)
      this.setIsRunning(false);
    const now = new Date().getTime();
    this.#sum += now - this.#begin;
    console.log(`pause: ${this.#time}`);
  }

  reset() { // 밀리초 단위로 입력 받기
    clearInterval(this.#counter);
    this.#isRunning = false;
    if(this.setIsRunning != null)
      this.setIsRunning(false);
    this.#time = 0;
    this.#sum = 0;
    this.#begin = 0;
    if(this.setTime != null)
        this.setTime(this.#time);
    console.log(`reset: ${this.#time}`);
  }
}