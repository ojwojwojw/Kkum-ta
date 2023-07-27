const LeftTimeRepository = require("../repository/leftTimeRepository");
const TimerRepository = require("../repository/timerRepository");

class TimerService{
    constructor(){
        this.leftTimeRepo = new LeftTimeRepository();
        this.timerRepo = new TimerRepository();
    }
    async getAllTimer(){
        const [rows] = await this.leftTimeRepo.findAll();
        return rows;
    }
    async getTimerById(id){
        const [timer] = await this.timerRepo.findTimerById(id);
        const [leftTime] = await this.leftTimeRepo.get(id);
        if(timer.length == 0){
            return null;
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
        return {
            timer_id: timer[0].timer_id,
            name: timer[0].timer_name,
            total_time: timer[0].time,
            state,
            left_time
        };
    }
    async getTimerByName(name){
        const [rows] = await this.leftTimeRepo.findTimerByName(name);
        return rows.map((item)=>{
            return {
                timer_id: item.timer_id,
                name: item.timer_name,
                total_time: item.time,
                state: item.state,
                left_time: item.left_time
            }
        });
    }
    async createTimer(name, total_time){
        const [rows] = await this.timerRepo.createTimer(total_time, name);
        return {status:"ok", timer_id:rows.insertId};
    }
    async putTimer(id, total_time){
        if(!id || !total_time){
            return {"status":"invalid parameter"};
        }
        await this.timerRepo.putTimer(id, total_time);
        await this.leftTimeRepo.set(id, "stop", total_time);
        return {status:"ok"};
    }
    async deleteTimer(id){
        await this.timerRepo.deleteTimer(id);
        return {status:"ok"};
    }
}
module.exports = TimerService;