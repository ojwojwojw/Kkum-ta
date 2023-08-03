const TimerService = require("./timerComponentService");
const StopwatchService = require("./stopwatchComponentService");
class ModuleService {
  constructor() {
    this.keyMap = {};
    this.array = [];
    this.valid = [];
  }
  createTimer(initTimes, maxIter) {
    if(maxIter === undefined) maxIter = 1;
    const timerService = new TimerService(initTimes, maxIter);
    this.keyMap[timerService.id] = this.array.length;
    //timerService.id = this.array.length;
    this.array.push(timerService);
    this.valid.push(true);
    return timerService.id;
  }
  createStopwatch(initTime) {
    const stopwatchService = new StopwatchService(initTime);
    this.keyMap[timerService.id] = this.array.length;
    //stopwatchService.id = this.array.length;
    this.array.push(stopwatchService);
    this.valid.push(true);
    return stopwatchService.id;
  }
  getAll(){
    return this.array.filter((item, index)=>this.valid[index]).map(item=>item.json());
  }
  getById(id) {
    id = this.keyMap[id];
    console.log("getById",id);
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return null;
    }
    return this.array[id].json();
  }
  start(id){
    id = this.keyMap[id];
    console.log("start",id);
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].start();
    return true;
  }
  pause(id){
    id = this.keyMap[id];
    console.log("pause",id);
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].pause();
    return true;
  }
  stop(id){
    id = this.keyMap[id];
    console.log("stop",id);
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].stop();
    return true;
  }
  tag(id){
    id = this.keyMap[id];
    console.log("tag",id);
    if(id < 0 || id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.array[id].tag();
    return true;
  }
  deleteById(id){
    id = this.keyMap[id];
    console.log("delete",id);
    if(this.id < 0 || this.id >= this.array.length || this.valid[id] === false){
        return false;
    }
    this.valid[id] = false;
    return true;
  }
  putInitTime(id, initTime){
    console.log("initTime",id);
    id = this.keyMap[id];
    if(this.id < 0 || this.id >= this.array.length || this.valid[id] === false){
        return false;
    }
    return this.array[id].setInitTime(initTime);
  }
}
module.exports = ModuleService;