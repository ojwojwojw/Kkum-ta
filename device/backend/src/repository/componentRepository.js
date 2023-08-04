const Repository = require("./repository");

class ComponentRepository extends Repository{
    constructor(groupRepository){
        super();
        this.groupRepository = groupRepository;
    }
    async init(){
        const sql = `
        CREATE TABLE IF NOT EXISTS component_tbl (
            component_key INT(11) NOT NULL AUTO_INCREMENT,
            group_key INT(11) NOT NULL DEFAULT '0',
            component_type VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
            init_time LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
            cur_time INT(11) NOT NULL DEFAULT '0',
            max_iter INT(11) NOT NULL DEFAULT '1',
            PRIMARY KEY (component_key) USING BTREE,
            INDEX FK_component_group (group_key) USING BTREE,
            CONSTRAINT FK_component_group FOREIGN KEY (group_key) REFERENCES group_tbl(group_key) ON UPDATE CASCADE ON DELETE CASCADE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`;
        await this.query(sql, []);
    }
    async getById(id){
        const sql = "SELECT * FROM component_tbl WHERE component_key=?";
        const params = [id];
        return this.query(sql, parmas);
    }
    async getByGroup(group_id){
        const sql = "SELECT * FROM component_tbl WHERE group_key=?";
        const params= [group_id];
        return this.query(sql, params);
    }
    async getAll(){
        const sql = "SELECT * FROM component_tbl";
        return this.query(sql, []);
    }
    async insert(group_key=0, component_type, init_time, cur_time, max_iter){
        const sql = `INSERT INTO component_tbl(group_key, component_type, init_time, cur_time, max_iter) VALUES(?, ?, ?, ?, ?)`;
        const params = [group_key, component_type, JSON.stringify(init_time), cur_time, max_iter];
        const [rows] = await this.query(sql, params);
        return rows.insertId;
    }

    async setGroupKey(id, group_key){
        const sql = `UPDATE component_tbl SET group_key=? WHERE component_key=?`;
        const params = [group_key, id];
        return this.query(sql, params);
    }
    async setInitTime(id, init_time){
        init_time = JSON.stringify(init_time);
        const sql = `UPDATE component_tbl SET init_time=? WHERE component_key=?`;
        const params = [init_time, id];
        return this.query(sql, params);
    }
    async setCurTime(id, cur_time){
        const sql = `UPDATE component_tbl SET cur_time=? WHERE component_key=?`;
        const params = [cur_time, id];
        return this.query(sql, params);
    }
    async setMaxIter(id, max_iter){
        const sql = `UPDATE component_tbl SET max_iter=? WHERE component_key=?`;
        const params = [max_iter, id];
        return this.query(sql, params);
    }
    async set(id, group_key, component_type, init_time, cur_time, max_iter){
        const sql = `UPDATE component_tbl SET group_key=?, component_type=?, init_time=?, cur_time=?, max_iter=? WHERE component_key=?`
        const params = [group_key, component_type, JSON.stringify(init_time), cur_time, max_iter, id];
        return this.query(sql, params);
    }
    async deleteById(id){
        const sql = `DELETE FROM component_tbl WHERE component_key=?`
        const params = [id];
        return this.query(sql, params);
    }
};

module.exports = ComponentRepository;