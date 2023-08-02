class StopwatchService {
  constructor(initTime) {
    this.id = Date.now();
    this.initTime = initTime;
    this.curTime = initTime; //외부 반출은 X. 왜...?
    this.isRunning = false;
    this.lastLogTime = Date.now();
  }
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastLogTime = Date.now();
  }
  pause() {
    if (!this.isRunning) return;
    const ellapsedMilliseconds = Date.now() - this.lastLogTime;
    this.curTime += ellapsedMilliseconds;
    this.isRunning = false;
    this.lastLogTime = Date.now();
  }
  tag() {
    return { next: null };
  }
  stop() {
    this.isRunning = false;
    this.curTime = 0;
    this.lastLogTime = Date.now();
  }
  json() {
    const ellapsedMilliseconds = Date.now() - this.lastLogTime;
    this.curTime += ellapsedMilliseconds;
    this.lastLogTime = Date.now();
    return {
      id: this.id,
      type: "stopwatch",
      initTime: this.initTime,
      limitTime: 360000 * 1000 - 1,
      isRunning: this.isRunning,
    };
  }
  setInitTime(initTime){
    this.initTime = initTime;
    this.curTime = initTime; //외부 반출은 X. 왜...?
    this.isRunning = false;
    this.lastLogTime = Date.now();
  }
}

module.exports = StopwatchService;
