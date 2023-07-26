const LeftTimeRepository = require("../repository/leftTimeRepository");
const TimerRepository = require("../repository/timerRepository");

class TimerService{
    constructor(){
        this.leftTimeRepo = new LeftTimeRepository();
        this.timerRepo = new TimerRepository();
    }
    async getAllTimer(){
        const [rows, _] = await this.leftTimeRepo.findAll();
        return rows;
    }
    async getTimerById(id){
        const [timer, timerFields] = await this.timerRepo.findTimerById(id);
        const [leftTime, leftFields] = await this.leftTimeRepo.get(id);
        if(timer.length == 0){
            return {};
        }
        let state, left_time;
        if(leftTime.length == 0){
            state = "stop";
            left_time = timer[0].time;
            await this.leftTimeRepo.set(id, "stop", left_time);
        }
        else{
            state = leftTime[0].state;
            left_time = leftTime[0].left_time;
        }
        const result = {
            timer_id: timer[0].timer_id,
            name: timer[0].timer_name,
            total_time: timer[0].time,
            state,
            left_time
        };
        return result;
    }
    async getTimerByName(name){
        const [rows, _] = await this.timerRepo.findTimerByName(name);
        console.log(rows);
    }
    async createTimer(name, total_time){

    }
    async putTimer(id, name, total_time){

    }
    async deleteTimer(id){

    }
}
module.exports = TimerService;