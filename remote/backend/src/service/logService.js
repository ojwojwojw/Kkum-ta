class LogService{
    constructor(logRepository){
        this.logRepository = logRepository;
    }
    async hour(user_id, group_id, date, hour){
        try{
            return this.logRepository.getHourlyStudytime(user_id, group_id, date, hour);
        } catch(err){
            return null;
        }
    }
    async date(user_id, group_id, date){
        try{
            return this.logRepository.getDailyStudytime(user_id, group_id, date);
        } catch(err){
            return null;
        }
    }
    async month(user_id, group_id, monthStr){
        try{
            const [year, month] = monthStr.split('-').map(Number);
            return this.logRepository.getMonthlyStudytime(user_id, group_id, year, month);    
        } catch(err) {
            return null;
        }
    }
    async year(user_id, group_id, year){
        try{
            return this.logRepository.getYearlyStudytime(user_id, group_id, year);
        } catch(err) {
            return null;
        }
    }
};

module.exports = LogService;