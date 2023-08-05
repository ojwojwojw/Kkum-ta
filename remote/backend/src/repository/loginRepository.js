const Repository = require('./repository');

class LoginRepository extends Repository{
    constructor(randomDeviceKeyService){
        super();
        this.randomDeviceKeyService = randomDeviceKeyService;
    }
    async init(){
        const sql = `CREATE TABLE IF NOT EXISTS login_tbl (
            login_key INT(11) NOT NULL AUTO_INCREMENT,
            user_key INT(11) NULL DEFAULT NULL,
            device_key CHAR(20) NULL DEFAULT NULL COLLATE "utf8mb4_bin", #CASE SENSITIVE
            PRIMARY KEY (login_key) USING BTREE,
            UNIQUE INDEX device_key (device_key)
        )
        COLLATE="utf8mb4_general_ci"
        ENGINE=InnoDB
        `;
        const params = [];
        await this.query(sql, params);
    }
    async insertDevice(){
        while(true){
            const device_key = this.randomDeviceKeyService.generate();
            const uniqueSQL = "SELECT * FROM login_tbl WHERE device_key=?";
            const params = [device_key];
            const [uniqueRows] = await this.query(uniqueSQL, params);
            if(uniqueRows.length !== 0) continue;
            const insertSQL = "INSERT INTO login_tbl (user_key, device_key) VALUES(null, ?)";
            const [rows] = await this.query(insertSQL, params);
            return rows.insertId;
        }
    }
    async getDeviceKeyById(id){
        const sql = `SELECT device_key FROM login_tbl WHERE login_key=?`;
        const params = [id];
        const [rows] = await this.query(sql, params);
        if(rows.length === 0) return null;
        return rows[0].device_key;
    }
    async getIdByDeviceKey(device_key){
        const sql = `SELECT login_key FROM login_tbl WHERE device_key=?`;
        const params = [device_key];
        const [rows] = await this.query(sql, params);
        if(rows.length === 0) return null;
        return rows[0].login_key;
    }
}

module.exports = LoginRepository;