const Repository = require("./repository");

class gruopRepository extends Repository {
    constructor() {
        super();
    }

    async init() {
        const sql = `
            CREATE TABLE 'group_tbl' (
                'group_key' INT(11) NOT NULL AUTO_INCREMENT,
                'user_key' INT(11) NOT NULL,
                'name' VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                'last_update' TIMESTAMP NULL DEFAULT current_timestamp(),
                PRIMARY KEY ('group_key') USING BTREE,
                INDEX 'user_key' ('user_key') USING BTREE,
                CONSTRAINT 'user_key' FOREIGN KEY ('user_key') REFERENCES 'user_tbl' ('user_key') ON UPDATE NO ACTION ON DELETE NO ACTION
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
            AUTO_INCREMENT=4
            ;
        `
        const params = [];
        await this.query(sql, params);
    }
    async insertGruop(ukey, name) {
        const sql = `INSERT INTO group_tbl (user_key, name) VALUES (?, ?)`;
        const params = [ukey, name];
        await this.query(sql, params);
    }

    async deleteGroup(group_id) {
        const sql = `DELETE FROM group_tbl WHERE gruop_key = ?`;
        const params = [group_id];
        await this.query(sql, params);
    }

    async getAllGroupByLoginKey(ukey) {
        const sql = `SELECT * FROM group_tbl WHERE user_key = ?`;
        const params = [ukey];
        const [rows] = await this.query(sql, params);
        return rows[0];
    }

    async getLoginKey() {}
}
