const mysql = require('mysql2/promise');
const options = require('../config/connection.js');

class TimerLogRepository{
    constructor(){
        this.pool = mysql.createPool(options);
    };
    async closeDB(){
        await this.pool.end();
    }
    async beginTransaction(){
        const conn = await this.pool.getConnection();
        await conn.beginTransaction();
        return conn;
    }   
    async rollback(conn){
        await conn.rollback();
        await conn.release();
    }
    async commit(conn){
        await conn.commit();
        await conn.release();
    }
    async init(){
        const conn = await this.pool.getConnection();
        const sql = "\
            CREATE TABLE IF NOT EXISTS `timer`.`timer_log` ( \
            `timer_log_id` INT NOT NULL AUTO_INCREMENT, \
            `timer_id` INT NOT NULL, \
            `operation` CHAR(10) NOT NULL, \
            `timer_log_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
            PRIMARY KEY (`timer_log_id`), \
            INDEX `fk_timer_id_idx` (`timer_id` ASC), \
            CONSTRAINT `fk_timer_id` \
              FOREIGN KEY (`timer_id`) \
              REFERENCES `timer`.`timer_table` (`timer_id`) \
              ON DELETE CASCADE\
              ON UPDATE NO ACTION \
            )\
            ENGINE = InnoDB \
            DEFAULT CHARACTER SET = utf8mb4\
            COLLATE = utf8mb4_unicode_ci;"
        await conn.execute(sql);
        conn.release();
    }
    async #do_operation(timer_id, operation, connection=null, timestamp=null){
        const conn = connection ? connection : await this.pool.getConnection();
        let sql = "";
        let params = [];
        if(timestamp){
            sql = "INSERT INTO `timer`.`timer_log`(operation, timer_id, timer_log_time) values(?,?,?)"
            params = [operation, timer_id, timestamp.timeString];
        }
        else{
            sql = "INSERT INTO `timer`.`timer_log`(operation, timer_id) values(?,?)"
            params = [operation, timer_id];
        }
        try{
            await conn.execute(sql, params);
        }catch(e){
            throw "SQLError: Cannot insert into database, " + e;
        };
        if(!connection){
            await conn.release();
        }
    }
    async start(timer_id, conn=null, timestamp=null){
        await this.#do_operation(timer_id, "start", conn, timestamp);
    }
    async pause(timer_id, conn=null, timestamp=null){
        await this.#do_operation(timer_id, "pause", conn, timestamp);
    }
    async stop(timer_id, conn=null, timestamp=null){
        await this.#do_operation(timer_id, "stop", conn, timestamp);
    }
    async created(timer_id, conn=null, timestamp=null){
        await this.#do_operation(timer_id, "created", conn, timestamp);
    }
    async deleted(timer_id, conn=null, timestamp=null){
        await this.#do_operation(timer_id, "deleted", conn, timestamp);
    }
    async findAll(connection=null){
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_log";
        const params = [];
        const result = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return result;
    }
    async findByTimerId(timer_id, connection=null){
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_log WHERE timer_id= ?";
        const params = [timer_id];
        const result = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return result;
    }
    async findByTimerIdAndHour(timer_id, time, connection=null){
        const start_time = DateTimeDto(time.y, time.m, time.d, time.hh, 0, 0);
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND DATE_ADD(?, INTERVAL 1 HOUR )";
        const params = [timer_id, start_time.timeString, start_time.timeString];
        const result = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return result;
    }
    async findByTimerIdAndDate(timer_id, date, connection=null){
        const start_time = DateTimeDto(date.y, date.m, date.d, 0, 0, 0);
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND DATE_ADD(?, INTERVAL 1 DAY )";
        const params = [timer_id, start_time.timeString, start_time.timeString];
        const result = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return result;
    }
    async findByTimerIdAndTimeInterval(timer_id, start_time, end_time, connection=null){
        const conn = connection ? connection : await this.pool.getConnection();
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND ?";
        const params = [timer_id, start_time.timeString, end_time.timeString];
        const result = await conn.execute(sql, params);
        if(!connection){
            await conn.release();
        }
        return result;
    }
}

module.exports = TimerLogRepository;