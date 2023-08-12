export default class BasicStopwatch {
  #counter;
  #curTime;
  #isRunning;
  #startTime;
  constructor() {
    this.#curTime = 0; // 현재 지난 시간
    this.#isRunning = false; // 스탑워치 동작 여부
    this.#startTime = 0; // 스탑워치 시작 시간

    this.setCurTime = null; // 현재 지난 시간 state setter
    this.setIsRunning = null; // 동작 여부 state setter
  }

  // 스탑워치 카운터 시작
  #startCounter() {
    this.#counter = setInterval(() => {
      const nowTime = new Date().getTime();
      this.#curTime = nowTime - this.#startTime;
      if (this.setCurTime != null) this.setCurTime(this.#curTime);
    }, 1);
  }

  // 스탑워치 시작
  start() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    this.#startTime = new Date().getTime() - this.#curTime;
    this.#startCounter();

    if (this.setIsRunning != null) this.setIsRunning(true);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;

    if (this.setIsRunning != null) this.setIsRunning(false);
  }

  reset() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#curTime = 0;
    this.#startTime = 0;

    if (this.setIsRunning != null) this.setIsRunning(false);
    if (this.setCurTime != null) this.setCurTime(this.#curTime);
  }

  load(obj) {
    this.#curTime = obj.curTime;
    this.#startTime = new Date().getTime() - this.#curTime;
    this.#isRunning = obj.isRunning;

    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    if (this.setCurTime != null) this.setCurTime(this.#curTime);
  }

  save() {
    return {
      curTime: this.#curTime,
      isRunning: this.#isRunning,
    };
  }
}
