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
        await conn.release();
    }
    async findAll(connection=null) {
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_table";
        const params = [];
        const query = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return query;
    }

    async registTimer(start, end, name, connection=null) {
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "INSERT INTO timer_table VALUES(0, ?, ?, ?)"
        const params = [start, end, name];
        const query = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return query;
    }

    async deleteTimer(timer_id, connection=null) {
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "DELETE FROM timer_table WHERE timer_id = ?";
        const params = [timer_id];
        const query = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return query;
    }

    async findTimerByName(timer_name, connection=null) {
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT timer_id FROM timer_table WHERE timer_name = ?";
        const params = [timer_name];
        const query = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }

        return query;
    }

    async closeDB() {
        await this.pool.end();
    }
}

module.exports = TimerRepository;
