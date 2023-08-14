const DeviceRepository = require('./repository/deviceRepository');
const UserRepository = require("./repository/userRepository");
const LogRepository = require("./repository/logRepository");
const GroupRepository = require('./repository/groupRepository');
const LogService = require('./service/logService');
const ComponentRepository = require('./repository/componentRepository')

class Global {
    static #deviceRepository = null;
    static #userRepository = null;
    static #logRepository = null;
    static #groupRepository = null;
    static #logService = null;
    static #componentRepository = null;

    static async getDeviceRepository(){
        if(!Global.#deviceRepository){
            Global.#deviceRepository = new DeviceRepository();
        }
        return Global.#deviceRepository;
    }
    static async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository(await Global.getGroupRepository());
            await Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
    static async getLogRepository(){
        if(!Global.#logRepository){
            Global.#logRepository = new LogRepository();
            await Global.#logRepository.init();
        }
        return Global.#logRepository;
    }
    static async getGroupRepository(){
        if(!Global.#groupRepository){
            Global.#groupRepository = new GroupRepository();
            await Global.#groupRepository.init();
        }
        return Global.#groupRepository;
    }
    static async getLogService(){
        if(!Global.#logService){
            Global.#logService = new LogService(await Global.getLogRepository());
        }
        return Global.#logService;
    }

    static async getComponentRepository() {
        if(!Global.#componentRepository) {
            Global.#componentRepository = new ComponentRepository();
            Global.#componentRepository.init();
        }
        return Global.#componentRepository;
    }

    static async getGroupRepository() {
        if(!Global.#groupRepository) {
            Global.#groupRepository = new GroupRepository();
            Global.#groupRepository.init();
        }
        return Global.#groupRepository;
    }
}

module.exports = Global;