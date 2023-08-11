const remoteHost = require('../config/remoteHost');

class StopwatchLogService{
    constructor(stopwatchLogRepository, groupRepository, studyHourlyRepository, deviceRepository){
        this.stopwatchLogRepository = stopwatchLogRepository;
        this.groupRepository = groupRepository;
        this.studyHourlyRepository = studyHourlyRepository;
        this.deviceRepository = deviceRepository;
        this.interval = null;
    }
    async log(id, operation){
        await this.stopwatchLogRepository.insert(id, operation);
    }
    async getRunningTime(id, beginTime, endTime){
        const [rows] = await this.stopwatchLogRepository.getByIdAndTime(id, beginTime, endTime);
        rows.push({operation: "stop", log_time:new Date(endTime)});
        return rows
            .map((item)=>{
                if(item.operation === "start"){
                    item.operation = 1;
                    return item;
                }
                else{
                    item.operation = 0;
                    return item;
                }
            })
            .reduce(
                (acc, cur)=>{
                    acc.result += cur.operation * (cur.log_time - acc.log_time)
                    acc.state = cur.operation;
                    acc.log_time = cur.log_time;
                    return acc;
                },
                {
                    result: 0,
                    state: rows[0].operation,
                    log_time:rows[0].log_time
                }
            ).result;
    }
    async getRunningTimeByDayAndHour(id, day, hour){
        const beginTime = new Date(`${day} ${hour}:00:00`);
        const endTime = beginTime;
        endTime.setHours(endTime.getHours()+1);
        return await this.getRunningTime(id, beginTime, endTime);
    }
    #stripMinuteSecond(datetime){
        datetime -= (dateTime % (60 * 60 * 1000));
        return new Date(dateTime);
    }
    #getDateAndHour(datetime){
        year = datetime.getFullYear();
        month = datetime.getMonth();
        month = month < 10?`0${month}`: month;
        date = datetime.getDate();
        date = date < 10? `0${date}`: date;
        hour = datetime.getHours();
        return [`${year}-${month}-${date}`, hour];
    }
    async update(){
        const [rows] = await this.groupRepository.getLastUpdateAll();
        const last_update = new Array(5).fill(undefined);
        rows.forEach((item)=>{
            last_update[item.id] = item.last_update;
        });
        targetTime = this.#stripMinuteSecond(new Date());
        for(let group_id=0;group_id<5;group_id++){
            let beginTime = this.#stripMinuteSecond(last_update[group_id]);
            while(beginTime < targetTime){
                const [day, hour] = this.#getDateAndHour(beginTime);
                const portion = await this.getRunningTimeByDayAndHour(day, hour);
                this.studyHourlyRepository.setHourlyStudytime(group_id, day, hour, portion);
            }
            this.groupRepository.setLastUpdate(group_id, targetTime);
        }
    }
    async send(){
        if(this.deviceRepository.getDeviceSerial() === null){
            return;
        }
        for(let group_id=0;group_id<5;group_id++){
            const [rows] = await this.studyHourlyRepository.getStudyTimes();
            const response = await axios.post(remoteHost.endpoint + "/log/device/{device_key}", rows);
            /**
             * TODO
             * if success: remove uploaded logs
             * else: continue
            */
        }
    }
    startRecording(intervalMilliseconds){
        this.interval = setInterval(update, intervalMilliseconds);
    }
    stopRecording(){
        if(!this.interval){
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
module.exports = StopwatchLogService;