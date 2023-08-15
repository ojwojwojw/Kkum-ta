const { user } = require("../config/connection");
const Repository = require("./repository");

class ComponentRepository extends Repository {
    constructor() {
        super();
    }

    async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS component_tbl (
                component_key INT(11) NOT NULL AUTO_INCREMENT,
                init_time INT(11) NULL DEFAULT NULL,
                maxIter INT(11) NULL DEFAULT NULL,
                group_key INT(11) NULL DEFAULT NULL,
                user_key INT(11) NULL DEFAULT NULL,
                PRIMARY KEY (component_key) USING BTREE,
                INDEX FK_component_tbl_group_tbl (group_key) USING BTREE,
                INDEX FK_component_tbl_user_tbl (user_key) USING BTREE,
                CONSTRAINT FK_component_tbl_group_tbl FOREIGN KEY (group_key) REFERENCES group_tbl (group_key) ON UPDATE NO ACTION ON DELETE CASCADE,
                CONSTRAINT FK_component_tbl_user_tbl FOREIGN KEY (user_key) REFERENCES user_tbl (user_key) ON UPDATE NO ACTION ON DELETE CASCADE
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
            AUTO_INCREMENT=4
            ;
        `;
        await this.query(sql, []);
    }

    async findAll() {
        return this.query(`SELECT * FROM component_tbl`, []);
    }

    async findAllByComponentKey(component_key) {
        const sql = `SELECT * FROM component_tbl WHERE component_key = ?`;
        const params = [component_key];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findAllComponentByGroupKey(group_key) {
        const sql = `SELECT * FROM component_tbl WHERE group_key = ?`;
        const params = [group_key];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findAllComponentByGroupKeyOfUser(group_key, user_id) {
        const sql = `
            SELECT component_key, init_time, maxIter, group_key, id FROM component_tbl
            JOIN user_tbl
            ON component_tbl.user_key = user_tbl.user_key
            WHERE group_key = ? AND id = ?;
        `
        const params = [group_key, user_id];
        const [rows] = await this.query(sql, params);
        return rows;
    }
    async findAllComponentByUserKeyAndGroup(user_key, group_key) {
        const sql = `
            SELECT component_key, init_time, maxIter, group_key
            FROM component_tbl WHERE user_key = ? AND group_key = ?
        `;
        const params = [user_key, group_key];
        const [rows] = await this.query(sql, params);
        return rows;
    }
    
    async findAllComponentByUserId(user_id) {
        const sql = `
            SELECT component_key, init_time, maxIter, group_key
            FROM component_tbl 
            JOIN user_tbl
            ON user_tbl.user_key = component_tbl.user_key
            WHERE id = ?;
        `;
        const params = [user_id];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findAllComponentByUserKey(user_key) {
        const sql = `
            SELECT component_key, init_time, maxIter, group_key
            FROM component_tbl WHERE user_key = ?
        `;
        const params = [user_key];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findByComponentKey(ckey) {
        const sql = `SELECT * FROM component_tbl WHERE component_key = ?`;
        const params = [ckey];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findByUserAndGroupAndComponent(ukey, gkey, ckey) {
        const sql = `SELECT * FROM component_tbl WHERE user_key = ? AND group_key = ? AND component_key = ?`;
        const params = [ukey, gkey, ckey];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async insertComponent(init_time, maxIter, group_key, user_key) {
        const sql = `
            INSERT INTO component_tbl(
                init_time, 
                maxIter,
                group_key,
                user_key
            ) VALUES(?, ?, ?, ?)
        `;
        const params = [init_time, maxIter, group_key, user_key];
        const [rows] = await this.query(sql, params);
        return rows.insertId;
    }

    async updateInitTime(ckey, init_time) {
        const sql = `UPDATE component_tbl SET init_time = ? WHERE component_key = ?`;
        const params = [init_time, ckey];
        const [rows] = await this.query(sql, params);
        return rows;
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

module.exports = ComponentRepository;