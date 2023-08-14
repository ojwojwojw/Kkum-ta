const remoteHost = require('../config/remoteHost');

class StopwatchLogService{
    constructor(stopwatchLogRepository, studyHourlyRepository){
        this.stopwatchLogRepository = stopwatchLogRepository;
        this.studyHourlyRepository = studyHourlyRepository;
        this.interval = null;
        this.update = async ()=>{ return this.#update()};
        this.update();
    }
    async log(id, operation){
        await this.stopwatchLogRepository.insert(id, operation);
    }

    calculateTimeRatios(group_key, startTime, stopTime) {
        startTime = new Date(startTime);
        stopTime = new Date(stopTime);
        const startTimestamp = startTime.getTime();
        const stopTimestamp = stopTime.getTime();
        const hourMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds
    
        const result = [];
        let currentTimestamp = startTimestamp;
    
        while (currentTimestamp < stopTimestamp) {
            const currentDate = new Date(currentTimestamp);
    
            // Calculate the next hour's timestamp
            const nextHourTimestamp = new Date(currentDate);
            nextHourTimestamp.setHours(currentDate.getHours() + 1);
            nextHourTimestamp.setMinutes(0);
            nextHourTimestamp.setSeconds(0);
            nextHourTimestamp.setMilliseconds(0);
    
            const ratio = (Math.min(nextHourTimestamp, stopTime) - Math.max(currentTimestamp, startTime)) / hourMilliseconds;
    
            result.push({
                group_key,
                date: currentDate.toISOString().slice(0, 10),
                hour: currentDate.getHours(),
                ratio: ratio
            });
    
            currentTimestamp = nextHourTimestamp.getTime();
        }
    
        return result;
    }

    async #update(){
        const groupedData = {};
        this.stopwatchLogRepository.getAllStartStopPair().then(([pair])=>{
            pair.map((item)=>{
                this.calculateTimeRatios(item.group_key, item.start_time, item.stop_time)
                .forEach((entry)=>{
                    const { group_key, date, hour, ratio } = entry;
                    const groupIdentifier = `${group_key}-${date}-${hour}`;
                    if (!groupedData[groupIdentifier]) {
                        groupedData[groupIdentifier] = {
                            group_key,
                            date,
                            hour,
                            portion: 0
                        };
                    }
                    groupedData[groupIdentifier].portion += ratio;
                });
            });
            const data = Object.values(groupedData);
            console.log("+Update hourly log: data", data, "+");
            data.forEach((item)=>{
                this.studyHourlyRepository.setHourlyStudytime(item.group_key, item.date, item.hour, item.portion);
            })
        });
        setTimeout(this.update, 1 * 60 * 1000);
    }
}
module.exports = StopwatchLogService;