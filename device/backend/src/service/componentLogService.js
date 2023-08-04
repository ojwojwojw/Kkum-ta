class ComponentLogService{
    constructor(componentLogRepository){
        this.componentLogRepository = componentLogRepository;
    }
    async log(id, operation){
        await this.componentLogRepository.insert(id, operation);
    }
    async getRunningTime(id, beginTime, endTime){
        const [rows] = await this.componentLogRepository.getByIdAndTime(id, beginTime, endTime);
        rows.push({operation: "stop", log_time:new Date(endTime)});
        return rows
            .map((item)=>{
                if(item.operation === "start" || item.operation === "tag"){
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
}
module.exports = ComponentLogService;