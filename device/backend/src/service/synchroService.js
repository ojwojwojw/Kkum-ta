const global = require("../global");

class SynchroService {
    constructor() {
        this.groupFromServerRepo = global.getGroupFromServerRepository();
        this.groupFromDeviceRepo = global.getGroupRepository();
        this.timerFromServerRepo = global.getTimerFromServerRepository();
        this.timerFromDeviceRepo = global.getTimerRepository();
    }

    async synchronizeDeviceAndServer() {
        const groupData = this.groupFromServerRepo.getAll();

        groupData.map((item) => {
            this.groupFromDeviceRepo.rename(item.group_key, item.name);
            this.groupFromDeviceRepo.setLastUpdate(
                item.group_key,
                item.last_update
            );

            const timerData = this.timerFromServerRepo.getByGroupId(
                item.group_key
            );
            this.timerFromDeviceRepo.deleteAllByGroupKey(item.group_key);
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
