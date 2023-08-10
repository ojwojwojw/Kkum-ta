class LogService{
    constructor(){

    }
    async hour(user_id, group_id, date, hour){
        return Math.random();
    }
    async date(user_id, group_id, date){
        return new Array(24).fill().map(()=>Math.random());
    }
    async month(user_id, group_id, monthStr){
        const [year, month] = monthStr.split('-').map(Number);
        const nDates = new Date(year, month, 0).getDate();
        return new Array(nDates).fill().map(()=>Math.random());
    }
    async year(user_id, group_id, year){
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const nDates = isLeapYear ? 366 : 365;
        return new Array(nDates).fill().map(()=>Math.random());
    }
};

module.exports = LogService;