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
        const conn = await this.pool.getConnection()
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
            `timer_log_id` INT NOT NULL AUTO_INCREMENT,`timer_id` INT NOT NULL, \
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
    async #do_operation(timer_id, operation){
        const conn = await this.pool.getConnection();
        const sql = "INSERT INTO `timer`.`timer_log`(operation, timer_id) values(?,?)"
        const params = [operation, timer_id];
        try{
            await conn.execute(sql, params);
        }catch(e){
            throw "SQLError: Cannot insert into database, " + e;
        };
        conn.release();
    }
    async start(timer_id){
        await this.#do_operation(timer_id, "start");
    }
    async pause(timer_id){
        await this.#do_operation(timer_id, "pause");
    }
    async stop(timer_id){
        await this.#do_operation(timer_id, "stop");
    }
    async created(timer_id){
        await this.#do_operation(timer_id, "created");
    }
    async deleted(timer_id){
        await this.#do_operation(timer_id, "deleted");
    }
}

module.exports = TimerLogRepository;