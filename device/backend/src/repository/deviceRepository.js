const Repository = require("./repository");

class DeviceRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql = `CREATE TABLE device_tbl (
            device_key INT(11) NOT NULL DEFAULT '0',
            device_serial CHAR(8) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
            PRIMARY KEY (device_key) USING BTREE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`;
        await this.query(sql, []);
    }
    async getDeviceSerial(){
        const sql = `SELECT device_serial FROM device_tbl`;
        const [rows] = await this.query(sql, []);
        if(rows.length === 0){
            return null;
        }
        return rows[0].device_serial;
    }
    async setDeviceSerial(device_key){
        const sql = `INSERT INTO device_tbl (device_serial) VALUES (?)
        ON DUPLICATE KEY UPDATE device_serial=?`
        const params = [device_key, device_key];
        await this.query(sql, params);
    }
}

module.exports = DeviceRepository;