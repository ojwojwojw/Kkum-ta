const Repository = require("./repository");

class GroupRepository extends Repository {
    constructor() {
        super();
    }

    async init() {
        const sql = `
        CREATE TABLE IF NOT EXISTS group_tbl (
            group_key INT(11) NOT NULL,
            user_key INT(11) NOT NULL,
            name VARCHAR(50) NULL DEFAULT NULL COLLATE utf8mb4_general_ci,
            last_update TIMESTAMP NULL DEFAULT current_timestamp(),
            PRIMARY KEY (group_key, user_key) USING BTREE,
            INDEX user_key_index (user_key) USING BTREE,
            CONSTRAINT user_key_fk FOREIGN KEY (user_key) REFERENCES user_tbl (user_key) ON UPDATE NO ACTION ON DELETE CASCADE
        )
        COLLATE=utf8mb4_general_ci
        ENGINE=InnoDB;
        `
        const params = [];
        await this.query(sql, params);
    }
    async createDefaultUserGroup(ukey){
        const sql = `
        INSERT IGNORE INTO group_tbl(group_key, user_key, name)
        VALUES
        (0, ?, '기본 그룹'),
        (1, ?, '그룹 1'),
        (2, ?, '그룹 2'),
        (3, ?, '그룹 3'),
        (4, ?, '그룹 4')`;
        const params = [ukey, ukey, ukey, ukey, ukey];
        await this.query(sql, params);
    }

    async insertGroup(ukey, name) {
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
}

module.exports = GroupRepository;