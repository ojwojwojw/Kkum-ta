const global = require("../global");

class SynchroService {
    // server와 device의 group 및 component 관리 repo 가져오기
    constructor() {
        this.groupFromServerRepo = global.getGroupFromServerRepository();
        this.groupFromDeviceRepo = global.getGroupRepository();
        this.timerFromServerRepo = global.getTimerFromServerRepository();
        this.timerFromDeviceRepo = global.getTimerRepository();
    }

    async synchronizeDeviceAndServer() {
        // device 사용자에 대한 모든 group 정보 get
        const groupData = this.groupFromServerRepo.getAll();

        // 각각의 group에 대해
        groupData.map((item) => {
            // gruop name, last_update 변경
            this.groupFromDeviceRepo.rename(item.group_key, item.name);
            this.groupFromDeviceRepo.setLastUpdate(
                item.group_key,
                item.last_update
            );
            
            // 현재 group에 대한 모든 component 정보 get
            const timerData = this.timerFromServerRepo.getByGroupId(
                item.group_key
            );
            // 기존 DB의 component 정보를 모두 삭제
            this.timerFromDeviceRepo.deleteAllByGroupKey(item.group_key);
            // 새 component로 이식
            timerData.map((timer) => {
                this.timerFromDeviceRepo.insert(
                    item.group_key,
                    timer.init_time,
                    timer.maxIter
                );
            });
        });
    }
}

module.exports = SynchroService;
