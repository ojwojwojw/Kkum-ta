const Repository = require("./repository");

class gruopRepository extends Repository {
    constructor() {
        super();
    }

    async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS group_tbl (
                'group_key' INT(11) NOT NULL,
                'login_key' INT(11) NOT NULL,
                'name' VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                'last_update' TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ('group_key') USING BTREE,
                INDEX 'login_key' ('login_key') USING BTREE,
                CONSTRAINT 'login_key' FOREIGN KEY ('login_key') REFERENCES 'login_tbl' ('login_key') ON UPDATE NO ACTION ON DELETE NO ACTION
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
            ;
        `;
        const params = [];
        await this.query(sql, params);
    }
    async insertGruop(lkey, name) {
        const sql = `INSERT INTO group_tbl (login_key, name) VALUES (?, ?)`;
        const params = [lkey, name];
        await this.query(sql, params);
    }

    async deleteGroup(group_id) {
        const sql = `DELETE FROM group_tbl WHERE gruop_key = ?`;
        const params = [group_id];
        await this.query(sql, params);
    }

    async getAllGroupByLoginKey(lkey) {
        const sql = `SELECT * FROM group_tbl WHERE login_key = ?`;
        const params = [lkey];
        const [rows] = await this.query(sql, params);
        return rows[0];
    }

    async getLoginKey() {}
}
