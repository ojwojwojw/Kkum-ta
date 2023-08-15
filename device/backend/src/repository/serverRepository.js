const options = require("../config/remoteHost.js");
const axios = require("axios")

class serverRepository {
    constructor() {
        this.base = options.endpoint;
    }

    async getUserId(serial) {
        const data = await axios.get(this.base + "/user/serial/" + serial);

        return data.data;
    }
    
    async getGroup(user_id) {
        const data = await axios.get(this.base + "/group/" + user_id);

        return data.data;
    }

    async getAllComponent(user_id) {
        const data = await axios.get(this.base + "/timer/user/" + user_id);

        return data.data;
    }

    async getComponent(user_id, group_key) {
        const data = await axios.get(this.base + "/timer/user/" + user_id + "/" + group_key);

        return data.data;
    }

}

module.exports = serverRepository;
