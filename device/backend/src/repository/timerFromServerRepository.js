const serverRepo = require('./serverRepository')
const deviceRepo = require('./deviceRepository')

class TimerFromServerRepository extends serverRepo {
    constructor(groupRepository) {
        super();
        this.groupRepository = groupRepository;
        this.serial = new deviceRepo().getDeviceSerial().device_serial;
        this.userKey = null;
    }

    async getUserKeyBySerial() {
        const sql = `
            SELECT user_key FROM user_tbl
            JOIN device_tbl ON user_tbl.device_key = device_tbl.device_key
            WHERE device_tbl.device_serial = ?;
        `
        const params = [this.serial];
        const [rows] = await this.query(sql, params);
        this.userKey = rows[0].user_key;
        return rows[0].user_key;
    }

    async getAllGroup() {
        const sql = `
            SELECT * FROM component_tbl WHERE user_key = ?
        `
        const params = [this.userKey];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async getByGroupKey(group_id) {
        const sql = `
            SELECT component_key, init_Time, maxIter FROM component_tbl
            WHERE user_key = ? AND group_key = ?
        `
        const params = [this.userKey, group_id];
        const [rows] = await this.query(sql, params);
        return rows;
    }
}

module.exports = TimerFromServerRepository;