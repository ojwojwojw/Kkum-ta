const Repository = require('./repository');

class GroupRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql =`
        CREATE TABLE IF NOT EXISTS group_tbl (
            group_key INT(11) NOT NULL,
            name VARCHAR(50) NULL DEFAULT '기본' COLLATE 'utf8mb4_general_ci',
            PRIMARY KEY (group_key) USING BTREE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB;`
        const params = [];
        await this.query(sql, params);
        await this.query("INSERT IGNORE INTO group_tbl(group_key) VALUES(0), (1), (2), (3), (4)", []);
    }
    createGroup(name=null){
        if(name === null){
            const sql = `INSERT IGNORE INTO group_tbl VALUES();`
            const params = [];
            return this.query(sql, params);
        }
        else{
            const sql = `INSERT INTO group_tbl(name) VALUES(?)`;
            const params = [name];
            return this.query(sql, params);
        }
    }
    async getDefaultId(){
        throw "NotImplemented";
    }
    getAll(){
        const sql = "SELECT * FROM group_tbl";
        const params = [];
        return this.query(sql, params);
    }
    getById(id){
        const sql = "SELECT * FROM group_tbl WHERE group_key=?";
        const params = [id];
        return this.query(sql, params);
    }
    delete(id){
        if(id === 0){
            throw "Cannot delete default group!";
        }
        const sql = "DELETE FROM group_tbl WHERE group_key=?";
        const params = [id];
        return this.query(sql, params);
    }
    rename(id, name){
        const sql = "UPDATE group_tbl SET name=? WHERE group_key=?";
        const params=[name, id];
        return this.query(sql, params);
    }
}

module.exports = GroupRepository;