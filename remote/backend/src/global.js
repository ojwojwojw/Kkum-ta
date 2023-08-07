const LoginRepository = require("./repository/loginRepository");
const UserRepository = require("./repository/userRepository");
const RandomDeviceKeyService = require("./service/randomDeviceKeyServiceRandexpImpl");
const DeviceService = require('./service/deviceService');

class Global {
    static #userRepository = null;
    static #loginRepository = null;
    static #randomDeviceKeyService = null;
    static #deviceService = null;
    static async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository();
            Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
    static async getLoginRepository(){
        if(!Global.#loginRepository){
            Global.#loginRepository = new LoginRepository(await Global.getRandomDeviceKeyService());
            Global.#loginRepository.init();
        }
        return Global.#loginRepository;
    }
    static async getRandomDeviceKeyService(){
        if(!Global.#randomDeviceKeyService){
            Global.#randomDeviceKeyService = new RandomDeviceKeyService();
        }
        return Global.#randomDeviceKeyService;
    }
    static async getDeviceService(){
        if(!Global.#deviceService){
            Global.#deviceService = new DeviceService(await Global.getLoginRepository());
        }
        return Global.#deviceService;
    }
}

module.exports = Global;