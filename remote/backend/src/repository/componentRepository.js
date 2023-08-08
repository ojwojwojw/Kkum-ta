const Repository = require("./repository");

class componentRepository extends Repository {
    constructor() {
        super();
    }

    async init() {
        const sql = `
            CREATE TABLE 'component_tbl' (
                'component_key' INT(11) NOT NULL AUTO_INCREMENT,
                'group_key' INT(11) NOT NULL,
                'component_type' VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                'init_time' INT(11) NULL DEFAULT NULL,
                'cur_time' INT(11) NULL DEFAULT NULL,
                'maxIter' INT(11) NULL DEFAULT NULL,
                PRIMARY KEY ('component_key') USING BTREE,
                INDEX 'group_key' ('group_key') USING BTREE,
                CONSTRAINT 'group_key' FOREIGN KEY ('group_key') REFERENCES 'group_tbl' ('group_key') ON UPDATE NO ACTION ON DELETE NO ACTION
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
            `;
        await this.query(sql, []);
    }

    async findAll() {
        return this.query(`SELECT * FROM component_tbl`, []);
    }

    async findAllComponentByGroupKey(group_key) {
        const sql = `SELECT * FROM component_tbl WHERE group_key = ?`;
        const params = [group_key];
        const rows = await this.query(sql, params);
        return rows[0];
    }

    async findByComponentKey(ckey) {
        const sql = `SELECT * FROM component_tbl WHERE component_key = ?`;
        const params = [ckey];
        const rows = await this.query(sql, params);
        return rows[0];
    }

    async insertCompoent(group_key, component_type, init_time, cur_time, maxIter) {
        const sql = `
            INSERT INTO component_tbl(
                group_key, 
                component_type, 
                init_time, 
                cur_time, 
                maxIter
            ) VALUES(?, ?, ?, ?, ?)
        `;
        const params = [group_key, component_type, init_time, cur_time, maxIter];
        await this.query(sql, params);
    }

    async updateInitTime(ckey, init_time) {
        const sql = `UPDATE component_tbl SET init_time = ? WHERE component_key = ?`;
        const params = [ckey, init_time];
        await this.query(sql, params);
        return true;
    }

    async updateCurTime(ckey, cur_time) {
        const sql = `UPDATE component_tbl SET cur_time = ? WHERE component_key = ?`;
        const params = [ckey, cur_time];
        await this.query(sql, params);
        return true;
    }

    async updateMaxIter(ckey, maxIter) {
        const sql = `UPDATE component_tbl SET maxIter = ? WHERE component_key = ?`;
        const params = [ckey, maxIter];
        await this.query(sql, params);
        return true;
    }

    async deleteComponent(ckey) {
        const sql = `DELETE FROM component_tbl WHERE component_key = ?`;
        const params = [ckey];
        return this.query(sql, params);
    }
}
