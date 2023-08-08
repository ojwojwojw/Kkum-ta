const Repository = require('./repository');

class DeviceRepository extends Repository{
    constructor(randomDeviceKeyService){
        super();
        this.randomDeviceKeyService = randomDeviceKeyService;
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
        throw new Error("Not Implemented");
    }
}

module.exports = DeviceRepository;