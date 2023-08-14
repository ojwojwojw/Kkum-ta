const serverRepo = require('./serverRepository')
const deviceRepo = require('./deviceRepository');
const { param } = require('../../../../remote/backend/src/controller/authController');

class GroupFromServerRepository extends serverRepo {
    constructor() {
        super();
        this.serial = new deviceRepo().getDeviceSerial();
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

    async getAll() {
        const sql = `SELECT * FROM gruop_tbl WHERE user_key = ?`
        const params = [this.userKey];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async getByGroupId(group_id) {
        const sql = `SELECT name, last_update FROM gruop_tbl WHERE user_key = ? AND group_key = ?`;
        const params = [this.userKey, group_id];
        const [rows] = await this.query(sql. params);
    }
}
