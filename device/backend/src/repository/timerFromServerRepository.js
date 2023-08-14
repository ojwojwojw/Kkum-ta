const serverRepo = require('./serverRepository')
const deviceRepo = require('./deviceRepository')

class TimerFromServerRepository extends serverRepo {
    constructor(groupRepository) {
        super();
        this.groupRepository = groupRepository;
        this.serial = new deviceRepo().getDeviceSerial();
    }
}