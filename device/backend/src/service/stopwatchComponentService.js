class StopwatchComponentService {
  constructor(initTime) {
    this.initTime = initTime;
    this.curTime = initTime;
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
    const now = Date.now()
    const ellapsedMilliseconds = now - this.lastLogTime;
    this.lastLogTime = now;
    this.curTime += ellapsedMilliseconds;
    this.isRunning = false;
  }
  stop() {
    this.isRunning = false;
    this.curTime = 0;
    this.lastLogTime = Date.now();
  }
  json() {
    const now = Date.now();
    const ellapsedMilliseconds = now - this.lastLogTime;
    if(this.isRunning){
      this.curTime += ellapsedMilliseconds;
    }
    this.lastLogTime = now;
    return {
      time: this.curTime,
      isRunning: this.isRunning
    };
  }
  setInitTime(initTime){
    initTime = parseInt(initTime);
    this.initTime = initTime;
    this.curTime = initTime;
    this.isRunning = false;
    this.lastLogTime = Date.now();
    return true;
  }
}

module.exports = StopwatchComponentService;
