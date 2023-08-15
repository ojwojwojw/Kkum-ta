const deviceService = require("./deviceService")
const deviceRepo = require("../repository/deviceRepository")
const serverRepo = require("../repository/serverRepository")
const groupRepo = require("../repository/groupRepository")
const timerRepo = require("../repository/timerRepository")
const global = require("../global")

class SynchroService {
    // server와 device의 group 및 component 관리 repo 가져오기
    constructor() {
        this.serverRepo = new serverRepo();
        this.deviceRepo = new deviceRepo();
        this.groupFromDeviceRepo = new groupRepo();
        this.timerFromDeviceRepo = new timerRepo();
    }

    async synchronizeDeviceAndServer() {
        const serial = await this.deviceRepo.getDeviceSerial();
        const userInfo = await this.serverRepo.getUserId(serial);
        const id = userInfo.id

        const groupData = await this.serverRepo.getGroup(id);

        groupData.map(async (group) => {
            if(group.group_key !== 1) {
                await this.groupFromDeviceRepo.rename(group.group_key, group.name);
    
                await this.timerFromDeviceRepo.deleteAllByGroupKey(group.group_key);
    
                const timerData = await this.serverRepo.getComponent(id, group.group_key);
                console.log(timerData);
            }
        })
    }
}

module.exports = SynchroService;
