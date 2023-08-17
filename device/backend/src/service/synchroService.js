class SynchroService {
    // server와 device의 group 및 component 관리 repo 가져오기
    constructor(serverRepository, deviceService, groupRepository, timerRepository) {
        this.serverRepo = serverRepository;
        this.deviceService = deviceService;
        this.groupFromDeviceRepo = groupRepository;
        this.timerFromDeviceRepo = timerRepository;
        this.synchronizeDeviceAndServer();
    }

    async synchronizeDeviceAndServer() {
        const serial = await this.deviceService.getDeviceSerial();
        const userInfo = await this.serverRepo.getUserId(serial);
        const id = userInfo?.id;
        if(id) {
            const groupData = await this.serverRepo.getGroup(id);
            groupData.map(async (group) => {
                if (group.group_key !== 0) {
                    await this.groupFromDeviceRepo.rename(
                        group.group_key,
                        group.name
                    );
                    await this.timerFromDeviceRepo.deleteAllByGroupKey(
                        group.group_key
                    );
    
                    const timerData = await this.serverRepo.getComponent(
                        id,
                        group.group_key
                    );
                    if (timerData.length !== 0) {
                        timerData.map((timer) => {
                            this.timerFromDeviceRepo.insert(
                                timer.group_key,
                                [timer.init_time],
                                timer.maxIter
                            );
                        });
                    }
                }
            });
        }
    }
}

module.exports = SynchroService;
