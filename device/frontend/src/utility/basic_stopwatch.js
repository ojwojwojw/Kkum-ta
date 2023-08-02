export default class BasicStopwatch {
  #counter
  #curTime
  #initTime
  #beginTime
  #isRunning
  #limitTime;
  constructor() {
    this.#curTime = 0;                             // 현재 지난 시간
    this.#initTime = 0;                            // 스탑워치 초기 시간
    this.#beginTime = 0;                           // 스탑워치 시작 시각
    this.#limitTime = 360000 * 1000 - 1;           // 스탑워치 시간 한계
    this.#isRunning = false;                       // 스탑워치 동작 여부

    this.setCurTime = null;                        // 현재 지난 시간 state setter
    this.setIsRunning = null;                      // 동작 여부 state setter
    console.log("basic stopwatch constructor")
  }

  // 스탑워치 카운터 죽이기
  #killCounter() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#curTime = this.#limitTime;

    // setter
    if (this.setIsRunning != null) this.setIsRunning(false);
  }

  // 스탑워치 카운터 시작
  #startCounter() {
    this.#counter = setInterval(() => {
      const nowTime = new Date().getTime();
      this.#curTime = nowTime - this.#beginTime + this.#initTime;
      if (this.#limitTime <= this.#curTime) this.#killCounter();
      if (this.setCurTime != null) this.setCurTime(this.#curTime);
    }, 31);
  }

  // 스탑워치 시작
  start() {
    if (this.#isRunning === true) return;
    this.#isRunning = true;
    this.#beginTime = new Date().getTime();
    this.#startCounter();

    // setter
    if (this.setIsRunning != null) this.setIsRunning(true);
    console.log(`start: ${this.#curTime}`);
  }

  pause() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    const nowTime = new Date().getTime();
    this.#initTime += nowTime - this.#beginTime;

    // setter
    if (this.setIsRunning != null) this.setIsRunning(false);
    console.log(`pause: ${this.#curTime}`);
  }

  reset() {
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#curTime = 0;
    this.#initTime = 0;
    this.#beginTime = 0;

    // setter
    if (this.setIsRunning != null) this.setIsRunning(false);
    if (this.setCurTime != null) this.setCurTime(this.#curTime);
    console.log(`reset: ${this.#curTime}`);
  }

  load(obj) {
    this.#curTime = obj.curTime;    
    this.#initTime = obj.initTime;  
    this.#beginTime = obj.beginTime;
    this.#limitTime = obj.limitTime;
    this.#isRunning = obj.isRunning;

    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    this.setCurTime(this.#curTime);
  }

  save() {
    return {
      curTime: this.#curTime,  
      initTime: this.#initTime, 
      beginTime: this.#beginTime,
      limitTime: this.#limitTime,
      isRunning: this.#isRunning,
    }
  }
}