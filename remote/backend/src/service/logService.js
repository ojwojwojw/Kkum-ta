class LogService{
    constructor(logRepository){
        this.logRepository = logRepository;
    }
    async hour(user_id, group_id, date, hour){
        return this.logRepository.getHourlyStudytime(user_id, group_id, date, hour);
    }
    async date(user_id, group_id, date){
        return this.logRepository.getDailyStudytime(user_id, group_id, date);
    }
    async month(user_id, group_id, monthStr){
        const [year, month] = monthStr.split('-').map(Number);
        return this.logRepository.getMonthlyStudytime(user_id, group_id, year, month);
    }
    async year(user_id, group_id, year){
        return this.logRepository.getYearlyStudytime(user_id, group_id, year);
    }
};

module.exports = LogService;