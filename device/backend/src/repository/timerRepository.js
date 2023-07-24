const mysql = require("mysql2/promise");
const options = require("../config/connection.js");

class TimerRepository {
    constructor() {
        this.pool = mysql.createPool(options);
    }
    async beginTransaction() {
        const conn = await this.pool.getConnection();
        await conn.beginTransaction();
        return conn;
    }
    async rollback(conn) {
        await conn.rollback();
        await conn.release();
    }
    async commit(conn) {
        await conn.commit();
        await conn.endTransaction();
    }
    async findAll() {
        const query = await this.pool.query(`SELECT * FROM timer_table`);

        return query;
    }

    async registTimer(start, end, name) {
        const query = await this.pool.query(
            `INSERT INTO timer_table VALUES(0, '${start}', '${end}', '${name}')`
        );
    }

    async deleteTimer(timer_id) {
        const query = await this.pool.query(
            `DELETE from timer_table WHERE timer_id = ${timer_id}`
        );
    }

    async closeDB() {
        await this.pool.end();
    }
}

module.exports = TimerRepository;
