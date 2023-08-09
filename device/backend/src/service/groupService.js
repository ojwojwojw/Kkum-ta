const StopwatchComponentService = require("./stopwatchComponentService");

class GroupService{
    constructor(groupRepository, stopwatchLogService){
        this.groupRepository = groupRepository;
        this.stopwatchLogService = stopwatchLogService;
        this.array = new Array(5).fill().map(()=>new StopwatchComponentService());
    }
    getStopwatchTime(group_id){
        return this.array[group_id].curTime;
    }
    setStopwatchTime(group_id, initTime){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].setInitTime(initTime);
    }
    start(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].start();
        this.stopwatchLogService.log(group_id, "start");
    }
    pause(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].pause();
        this.stopwatchLogService.log(group_id, "pause");
    }
    stop(group_id){
        if(!Number.isInteger(group_id) || group_id < 0 || group_id > 5){
            throw new Error(`Invalid group_id(${group_id})`);
        }
        this.array[group_id].stop();
        this.stopwatchLogService.log(group_id, "stop");
    }
}

module.exports = GroupService;