class SynchroService {
    // server와 device의 group 및 component 관리 repo 가져오기
    constructor(serverRepository, deviceService, groupRepository, timerService) {
        this.serverRepo = serverRepository;
        this.deviceService = deviceService;
        this.groupFromDeviceRepo = groupRepository;
        this.timerService = timerService;
        this.synchronizeDeviceAndServer();
    }

    async synchronizeDeviceAndServer() {
        const serial = await this.deviceService.getDeviceSerial();
        console.log(serial);
        const userInfo = await this.serverRepo.getUserId(serial);
        const id = userInfo?.id;
        console.log(id);
        if(id) {
            const groupData = await this.serverRepo.getGroup(id);
            console.log(groupData);
            groupData.map(async (group) => {
                if (group.group_key !== 0) {
                    await this.groupFromDeviceRepo.rename(
                        group.group_key,
                        group.name
                    );
                    await this.timerService.deleteAllByGroupKey(
                        group.group_key
                    );
    
                    const timerData = await this.serverRepo.getComponent(
                        id,
                        group.group_key
                    );
                    console.log(timerData);
                    if (timerData.length !== 0) {
                        timerData.map((timer) => {
                            this.timerService.createTimer(
                                [timer.init_time],
                                timer.maxIter,
                                timer.group_key
                            )
                        });
                    }
                }
            });
        }
    }
}

module.exports = SynchroService;