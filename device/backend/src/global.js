const ComponentRepository = require('./repository/componentRepository');
const GroupRepository = require('./repository/groupRepository');
const StopwatchRepository = require('./repository/stopwatchRepository');
const TimerRepository = require('./repository/timerRepository');
const ModuleService = require('./service/moduleService');

class Global {
    static #componentRepository = null;
    static #groupRepository = null;
    static #stopwatchRepository = null;
    static #timerRepository = null;
    static #moduleService = null;

    static async getComponentRepository() {
        if (!Global.#componentRepository) {
            Global.#componentRepository = new ComponentRepository(await Global.getGroupRepository());
            await Global.#componentRepository.init();
        }
        return Global.#componentRepository;
    }

    static async getGroupRepository() {
        if (!Global.#groupRepository) {
            Global.#groupRepository = new GroupRepository();
            await Global.#groupRepository.init();
        }
        return Global.#groupRepository;
    }

    static async getStopwatchRepository() {
        if (!Global.#stopwatchRepository) {
            Global.#stopwatchRepository = new StopwatchRepository();
            await Global.#stopwatchRepository.init();
        }
        return Global.#stopwatchRepository;
    }

    static async getTimerRepository() {
        if (!Global.#timerRepository) {
            Global.#timerRepository = new TimerRepository();
            await Global.#timerRepository.init();
        }
        return Global.#timerRepository;
    }

    static async getModuleService() {
        if(!Global.#moduleService){
            Global.#moduleService = new ModuleService(await Global.getComponentRepository(), await Global.getTimerRepository(), await Global.getStopwatchRepository());
            await Global.#moduleService.init();
        }
        return Global.#moduleService;
    }
}

module.exports = Global;