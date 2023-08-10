const StopwatchComponentService = require("./stopwatchComponentService");

class GroupService{
    constructor(groupRepository, stopwatchLogService){
        this.groupRepository = groupRepository;
        this.stopwatchLogService = stopwatchLogService;
        this.array = new Array(5).fill().map(()=>new StopwatchComponentService(0));
    }
    async init(){
        const [rows] = await this.groupRepository.getAll();
        rows.forEach((item)=>{
            console.log(item);
            this.array[item.group_key].setInitTime(item.stopwatch_time);
        })
    }
    getAll(){
        return this.array.map(item=>item.json());
    }
    getStopwatchTime(group_id){
        return this.array[group_id].json().time;
    }
    json(group_id){
        return this.array[group_id].json();
    }
    setStopwatchTime(group_id, initTime){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].setInitTime(initTime);
        this.groupRepository.setInitTime(group_id, init_time);
    }
    start(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].start();
        this.stopwatchLogService.log(group_id, "start");
        this.groupRepository.setInitTime(group_id, getStopwatchTime(group_id));
    }
    pause(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].pause();
        this.stopwatchLogService.log(group_id, "pause");
        this.groupRepository.setInitTime(group_id, getStopwatchTime(group_id));
    }
    stop(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].stop();
        this.stopwatchLogService.log(group_id, "stop");
        this.groupRepository.setInitTime(group_id, getStopwatchTime(group_id));
    }
}

module.exports = GroupService;