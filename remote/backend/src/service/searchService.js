const UserRepository = require("../repository/userRepository");

class SearchService {
    constructor () {
        this.userRepository = new UserRepository();
    }
    
    async SearchID(email) {
        const id = await this.userRepository.getIdByEmail(email);
        return id;
    }
}

module.exports = SearchService;