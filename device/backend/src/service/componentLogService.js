class ComponentLogService{
    constructor(componentLogRepository){
        this.componentLogRepository = componentLogRepository;
    }
    async log(id, operation){
        await this.componentLogRepository.insert(id, operation);
    }
}
module.exports = ComponentLogService;