const TimerService = require("./timerService");
const StopwatchService = require("./stopwatchService");
class ComponentService {
  constructor(componentRepository, timerRepository, stopwatchRepository) {
    this.componentRepository = componentRepository;
    this.timerRepository = timerRepository;
    this.stopwatchRepository = stopwatchRepository;
    this.array = new Map(); //Object와 비슷하지만 순서를 유지
  }
  async init(){
    const [rows] = await this.componentRepository.getAll();
    rows.forEach((item)=>{
      item.init_time = JSON.parse(item.init_time);
      let service;
      switch(item.component_type){
        case 'stopwatch':
          service = new StopwatchService(item.init_time, JSON.parse(item.group_key));
          service.id = item.component_key;
          this.array.set(item.component_key, service);
          break;
        case 'timer':
          service = new TimerService(item.init_time, item.max_iter, JSON.parse(item.group_key));
          service.id = item.component_key;
          this.array.set(item.component_key, service);
          break;
        default:
          throw `Unexpected type found in DB: ${item.component_type}`;
      }
    })
  }
  async createTimer(initTimes, maxIter, group_id=0) {
    if(maxIter === undefined) maxIter = 1;
    const promise = this.timerRepository.create(initTimes, maxIter, group_id);
    const timerService = new TimerService(initTimes, maxIter, group_id);
    timerService.id = await promise;
    this.array.set(timerService.id, timerService);
    return timerService.id;
  }
  async createStopwatch(initTime, group_id=0) {
    const promise = this.stopwatchRepository.create(initTime, group_id);
    const stopwatchService = new StopwatchService(initTime, group_id);
    stopwatchService.id = await promise;
    this.array.set(stopwatchService.id, stopwatchService);
    return stopwatchService.id;
  }
  getAll(){
    return [...this.array.values()].map(item=>item.json());
  }
  getByGroup(group_id){
    return [...this.array.values()].filter(item=>item.group_id===group_id).map(item=>item.json());
  }
  getById(id) {
    if(!this.array.has(id)) return null;
    return this.array.get(id).json();
  }
  start(id){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    this.array.get(id).start();
    return {ok:true, message:"ok"};
  }
  pause(id){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    this.array.get(id).pause();
    return {ok:true, message:"ok"};
  }
  stop(id){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    this.array.get(id).stop();
    return {ok:true, message:"ok"};
  }
  tag(id){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    this.array.get(id).tag();
    return {ok:true, message:"ok"};
  }
  async deleteById(id){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    this.array.delete(id);
    await this.componentRepository.deleteById(id);
    return {ok:true, message:"ok"};
  }
  async putInitTime(id, initTime){
    if(!this.array.has(id)) return {ok:false, message:`Cannot find item with id=${id}`};
    await this.componentRepository.setInitTime(id, initTime);
    await this.array.get(id).setInitTime(initTime);
    return {ok:true, message:"ok"};
  }
}
module.exports = ComponentService;
