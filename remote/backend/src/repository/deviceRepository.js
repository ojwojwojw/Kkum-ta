const Repository = require('./repository');
const Randexp = require('randexp');

class DeviceRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql = `CREATE TABLE IF NOT EXISTS device_tbl (
            device_key INT(11) NOT NULL AUTO_INCREMENT,
            device_serial CHAR(20) NOT NULL COLLATE "utf8mb4_bin", #CASE SENSITIVE
            PRIMARY KEY (device_key) USING BTREE,
            UNIQUE INDEX device_key (device_serial) USING BTREE
        )
        COLLATE="utf8mb4_general_ci"
        ENGINE=InnoDB
        `;
        const params = [];
        await this.query(sql, params);
    }
    async getNewDeviceSerial(){
        const sql = `INSERT IGNORE INTO device_tbl (device_serial) VALUES (?)`;
        const randexp = new Randexp(/^[0-9A-Za-z]{8}$/)
        while(true){
            let key = randexp.gen();
            let [rows] = await this.query(sql, [key]);
            if(rows.affectedRows === 1){
                return key;
            }
        }
    }
}

module.exports = DeviceRepository;