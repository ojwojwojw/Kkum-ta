class LogService{
    constructor(){

    }
    async hour(timer_id, date, hour){
        return Math.random();
    }
    async date(timer_id, date){
        return new Array(24).fill().map(()=>Math.random());
    }
    async month(timer_id, month){
        return new Array(30).fill().map(()=>Math.random());
    }
    async year(timer_id, year){
        return new Array(365).fill().map(()=>Math.random());
    }
};

module.exports = LogService;