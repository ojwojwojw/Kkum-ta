const Repository = require("./repository");

class GruopRepository extends Repository {
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

    async insertGroupByUserId(group_key, uid, name) {
        const sql = `
            INSERT INTO group_tbl(group_key, user_key, name)
            VALUES(
                ?,
                (SELECT user_key FROM user_tbl WHERE id = ?),
                ?
            )
        `;
        const params = [group_key, uid, name];
        await this.query(sql, params);
    }

    async updateNameByUserIdAndGroupKey(uid, gkey, name) {
        const sql = `
            UPDATE group_tbl SET name = ?
            WHERE user_key = (
                SELECT user_key FROM user_tbl WHERE id = ?
            ) AND group_key = ?
        `;
        const params = [name, uid, gkey];
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

    async findAllByUserId(uid) {
        const sql = `
            SELECT group_key, name, last_update
            FROM group_tbl JOIN user_tbl
            ON group_tbl.user_key = user_tbl.user_key
            WHERE user_tbl.id = ?
        `;
        const params = [uid];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async findByUserIdAndGroupId(uid, gid) {
        const sql = `
            SELECT name, last_update FROM group_tbl
            JOIN user_tbl ON group_tbl.user_key = user_tbl.user_key
            WHERE user_tbl.id = ? AND group_tbl.group_key = ?
        `;
        const params = [uid, gid];
        const [rows] = await this.query(sql, params);
        return rows;
    }

    async getLoginKey() {}
}

module.exports = GruopRepository;
