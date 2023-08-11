const DeviceRepository = require("./repository/deviceRepository");
const GroupRepository = require("./repository/groupRepository");
const StopwatchLogRepository = require("./repository/stopwatchLogRepository");
const StudyHourlyRepository = require("./repository/studyHourlyRepository");
const TimerRepository = require("./repository/timerRepository");

const DeviceService = require("./service/deviceService");
const GroupService = require("./service/groupService");
const TimerService = require("./service/timerService");
const StopwatchLogService = require("./service/stopwatchLogService");

class Global {
  static #deviceRepository = null;
  static #groupRepository = null;
  static #stopwatchLogRepository = null;
  static #studyHourlyRepository = null;
  static #timerRepository = null;

  static #deviceService = null;
  static #groupService = null;
  static #timerService = null;
  static #stopwatchLogService = null;

  static async getDeviceRepository() {
    if (!Global.#deviceRepository) {
      Global.#deviceRepository = new DeviceRepository();
      await Global.#deviceRepository.init();
    }
    return Global.#deviceRepository;
  }

  static async getGroupRepository() {
    if (!Global.#groupRepository) {
      Global.#groupRepository = new GroupRepository();
      await Global.#groupRepository.init();
    }
    return Global.#groupRepository;
  }

  static async getStopwatchLogRepository() {
    if (!Global.#stopwatchLogRepository) {
      Global.#stopwatchLogRepository = new StopwatchLogRepository();
      await Global.#stopwatchLogRepository.init();
    }
    return Global.#stopwatchLogRepository;
  }

  static async getStudyHourlyRepository() {
    if (!Global.#studyHourlyRepository) {
      Global.#studyHourlyRepository = new StudyHourlyRepository();
      await Global.#studyHourlyRepository.init();
    }
    return Global.#studyHourlyRepository;
  }

  static async getTimerRepository() {
    if (!Global.#timerRepository) {
      Global.#timerRepository = new TimerRepository(
        await Global.getGroupRepository()
      );
      await Global.#timerRepository.init();
    }
    return Global.#timerRepository;
  }

  static async getDeviceService() {
    if (!Global.#deviceService) {
      Global.#deviceService = new DeviceService(
        await Global.getDeviceRepository()
      );
    }
    return Global.#deviceService;
  }

  static async getGroupService() {
    if (!Global.#groupService) {
      Global.#groupService = new GroupService(
        await Global.getGroupRepository(),
        await Global.getStopwatchLogService()
      );
      await Global.#groupService.init();
    }
    return Global.#groupService;
  }

  static async getTimerService() {
    if (!Global.#timerService) {
      Global.#timerService = new TimerService(
        await Global.getTimerRepository()
      );
      await Global.#timerService.init();
    }
    return Global.#timerService;
  }

  static async getStopwatchLogService() {
    if (!Global.#stopwatchLogService) {
      Global.#stopwatchLogService = new StopwatchLogService(
        await Global.getStopwatchLogRepository(),
        await Global.getGroupRepository(),
        await Global.getStudyHourlyRepository(),
        await Global.getDeviceRepository()
      );
    }
    return Global.#stopwatchLogService;
  }
}

module.exports = Global;
