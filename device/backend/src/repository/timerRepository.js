const Repository = require("./repository");

class timerRepository extends Repository{
    constructor(groupRepository){
        super();
        this.groupRepository = groupRepository;
    }
    async init(){
        const sql = `
        CREATE TABLE IF NOT EXISTS timer_tbl (
            timer_key INT(11) NOT NULL AUTO_INCREMENT,
            group_key INT(11) NOT NULL DEFAULT '0',
            init_time LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
            max_iter INT(11) NOT NULL DEFAULT '1',
            PRIMARY KEY (timer_key) USING BTREE,
            INDEX FK_timer_group (group_key) USING BTREE,
            CONSTRAINT FK_timer_group FOREIGN KEY (group_key) REFERENCES group_tbl(group_key) ON UPDATE CASCADE ON DELETE CASCADE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`;
        await this.query(sql, []);
    }
    async getById(id){
        const sql = "SELECT * FROM timer_tbl WHERE timer_key=?";
        const params = [id];
        return this.query(sql, parmas);
    }
    async getByGroup(group_id){
        const sql = "SELECT * FROM timer_tbl WHERE group_key=?";
        const params= [group_id];
        return this.query(sql, params);
    }
    async getAll(){
        const sql = "SELECT * FROM timer_tbl";
        return this.query(sql, []);
    }
    async insert(group_key=0, init_time, max_iter){
        const sql = `INSERT INTO timer_tbl(group_key, init_time, max_iter) VALUES(?, ?, ?, ?, ?)`;
        const params = [group_key, JSON.stringify(init_time), max_iter];
        const [rows] = await this.query(sql, params);
        return rows.insertId;
    }

    async setGroupKey(id, group_key){
        const sql = `UPDATE timer_tbl SET group_key=? WHERE timer_key=?`;
        const params = [group_key, id];
        return this.query(sql, params);
    }
    async setInitTime(id, init_time){
        init_time = JSON.stringify(init_time);
        const sql = `UPDATE timer_tbl SET init_time=? WHERE timer_key=?`;
        const params = [init_time, id];
        return this.query(sql, params);
    }
    async setCurTime(id, cur_time){
        const sql = `UPDATE timer_tbl SET cur_time=? WHERE timer_key=?`;
        const params = [cur_time, id];
        return this.query(sql, params);
    }
    async setMaxIter(id, max_iter){
        const sql = `UPDATE timer_tbl SET max_iter=? WHERE timer_key=?`;
        const params = [max_iter, id];
        return this.query(sql, params);
    }
    async deleteById(id){
        const sql = `DELETE FROM timer_tbl WHERE timer_key=?`
        const params = [id];
        return this.query(sql, params);
    }
};

module.exports = timerRepository;