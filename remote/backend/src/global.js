const DeviceRepository = require('./repository/deviceRepository');
const UserRepository = require("./repository/userRepository");
const LogService = require('./service/logService');
const ComponentRepository = require('./repository/componentRepository')
const GroupRepository = require('./repository/groupRepository')

class Global {
    static #deviceRepository = null;
    static #userRepository = null;
    static #logService = null;
    static #componentRepository = null;
    static #groupRepository = null;

    static async getDeviceRepository(){
        if(!Global.#deviceRepository){
            Global.#deviceRepository = new DeviceRepository();
        }
        return Global.#deviceRepository;
    }
    static async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository();
            Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
    static async getLogService(){
        if(!Global.#logService){
            Global.#logService = new LogService();
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