const UserRepository = require("./repository/userRepository");

class Global {
    #userRepository = null;
    async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository();
            Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
}

module.exports = Global;