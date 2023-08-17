const Repository = require('./repository');

const version = "v2"

class GroupRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql =`
        CREATE TABLE IF NOT EXISTS group_tbl_${version} (
            group_key INT(11) NOT NULL,
            name VARCHAR(50) NULL DEFAULT '기본' COLLATE 'utf8mb4_general_ci',
            last_update TIMESTAMP NULL DEFAULT current_timestamp(),
            stopwatch_time INT(11) NOT NULL DEFAULT '0',
            PRIMARY KEY (group_key) USING BTREE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB;`
        const params = [];
        await this.query(sql, params);
        await this.query(`INSERT IGNORE INTO group_tbl_${version}(group_key) VALUES(0), (1), (2), (3), (4)`, []);
        return true;
    }
    async getAll(){
        const sql = `SELECT * FROM group_tbl_${version}`;
        const params = [];
        return this.query(sql, params);
    }
    async getById(id){
        const sql = `SELECT * FROM group_tbl_${version} WHERE group_key=?`;
        const params = [id];
        return this.query(sql, params);
    }
    async rename(id, name){
        const sql = `UPDATE group_tbl_${version} SET name=? WHERE group_key=?`;
        const params=[name, id];
        return this.query(sql, params);
    }
    async setStopwatchTime(id, miliseconds){
        const sql = `UPDATE group_tbl_${version} SET stopwatch_time=? WHERE group_key=?`;
        const params = [miliseconds, id];
        return this.query(sql, params);
    }
    async getLastUpdateAll(){
        const sql = `SELECT group_key, last_update FROM group_tbl_${version}`;
        const params = [];
        return this.query(sql, params);
    }
    async setLastUpdate(id, last_update){
        const sql = `UPDATE group_tbl_${version} SET last_update=? WHERE group_key=?`;
        const params = [last_update, id];
        return this.query(sql, params);
    }
}

module.exports = GroupRepository;