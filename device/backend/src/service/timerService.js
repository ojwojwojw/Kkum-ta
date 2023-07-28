const TimerRepository = require("../repository/timerRepository");

class TimerService{
    constructor(){
        this.timerRepo = new TimerRepository();
    }
    async getAllTimer(){
        const [rows] = await this.timerRepo.findAll();
        return rows;
    }
    async getTimerById(id){
        if(Object.is(parseInt(id), NaN)) return null;
        const [timer] = await this.timerRepo.findTimerById(id);
        if(timer.length == 0){
            return null;
        }
        return timer[0];
    }
    async getTimerByName(name){
        const [rows] = await this.timerRepo.findTimerByName(name);
        return rows;
    }
    async createTimer(name, total_time){
        if(Object.is(parseInt(total_time), NaN)){
            return {status:"invalid parameter"};
        }
        const [rows] = await this.timerRepo.createTimer(total_time, name);
        return {status:"ok", timer_id:rows.insertId};
    }
    async putTimer(id, name, total_time){
        if(!id || !name || !total_time){
            return {status:"invalid parameter"};
        }
        await this.timerRepo.putTimer(id, name, total_time);
        return {status:"ok"};
    }
    async deleteTimer(id){
        await this.timerRepo.deleteTimer(id);
        return {status:"ok"};
    }
}
module.exports = TimerService;