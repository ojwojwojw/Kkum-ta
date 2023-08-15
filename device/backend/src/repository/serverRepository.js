const options = require("../config/remoteHost.js");
const axios = require("axios")

class Repository {
    constructor() {
        this.base = options.endpoint;
    }
    
    async getGroup(user_id) {
        const data = await axios.get(base + "/group/" + user_id);

        return data;
    }

    async getAllComponent(user_id) {
        const data = await axios.get(base + "/timer/user/" + user_id);

        return data;
    }

    async getComponent(user_id, group_key) {
        const data = await axios.get(base + "/timer/user/" + user_id + "/" + group_key);

        return data;
    }
}

module.exports = Repository;
