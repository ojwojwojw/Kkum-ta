const UserRepository = require("./repository/userRepository");

class Global {
    static #userRepository = null;
    static async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository();
            Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
}

module.exports = Global;