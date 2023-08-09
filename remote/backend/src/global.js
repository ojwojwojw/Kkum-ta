const DeviceRepository = require('./repository/deviceRepository');
const UserRepository = require("./repository/userRepository");
const LogService = require('./service/logService');

class Global {
    static #deviceRepository = null;
    static #userRepository = null;
    static #logService = null;

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
}

module.exports = Global;