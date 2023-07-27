const TimerLogRepository = require("../repository/timerLogRepository");
const leftTimeRepository = require("../repository/leftTimeRepository");

class TimerLogService {
    constructor() {
        this.timerLogRepo = new TimerLogRepository();
        this.leftTimeRepo = new leftTimeRepository();
    }

    async logTimerStarted(timer_id) {
        if (!timer_id) {
            return { status: "unvalid parameter" };
        }

        await this.timerLogRepo.start(timer_id);
        return { status: "ok" };
    }

    async logTimerPaused(timer_id) {
        if (!timer_id) {
            return { status: "unvalid parameter" };
        }

        await this.timerLogRepo.pause(timer_id);
        return { status: "ok" };
    }

    async deleteLogByTimerId(timer_id) {
        await this.timerLogRepo.deleted(timer_id);
        return { status: "ok" };
    }
}

module.exports = TimerLogService;
