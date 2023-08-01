const TimerService = require("./timerComponentService");
const StopwatchService = require("./stopwatchComponentService");
class ModuleService {
  constructor() {
    this.array = [];
    this.valid = [];
  }
  createTimer(initTimes, maxIter) {
    if(maxIter === undefined) maxIter = 1;
    const timerService = new TimerService(initTimes, maxIter);
    timerService.id = this.array.length;
    this.array.push(timerService);
    this.valid.push(true);
    return timerService.id;
  }
  createStopwatch(initTime) {
    const stopwatchService = new StopwatchService(initTime);
    stopwatchService.id = this.array.length;
    this.array.push(stopwatchService);
    this.valid.push(true);
    return stopwatchService.id;
  }
  getAll(){
    return this.array.map(item=>item.json());
  }
  getById(id) {
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return null;
    }
    return this.array[id].json();
  }
  start(id){
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].start();
    return true;
  }
  pause(id){
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].pause();
    return true;
  }
  stop(id){
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].stop();
    return true;
  }
  tag(id){
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].tag();
    return true;
  }
  deleteById(id){
    if(this.id < 0 || this.id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.valid[id] = false;
    return true;
  }
}
module.exports = ModuleService;