const Repository = require('./repository.js');

class TimerLogRepository extends Repository{
    constructor(){
        super();
    };
    async init(){
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
        await this.query(sql, []);
    }
    async #do_operation(timer_id, operation, timestamp=null){
        let sql, params;
        if(timestamp){
            sql = "INSERT INTO `timer`.`timer_log`(operation, timer_id, timer_log_time) values(?,?,?)"
            params = [operation, timer_id, timestamp.timeString];
        }
        else{
            sql = "INSERT INTO `timer`.`timer_log`(operation, timer_id) values(?,?)"
            params = [operation, timer_id];
        }
        try{
            await this.query(sql, params);
        }catch(e){
            throw "SQLError: Cannot insert into database, " + e;
        };
    }
    async start(timer_id, timestamp=null){
        await this.#do_operation(timer_id, "start", timestamp);
    }
    async pause(timer_id, timestamp=null){
        await this.#do_operation(timer_id, "pause", timestamp);
    }
    async stop(timer_id, timestamp=null){
        await this.#do_operation(timer_id, "stop", timestamp);
    }
    async created(timer_id, timestamp=null){
        await this.#do_operation(timer_id, "created", timestamp);
    }
    async deleted(timer_id, timestamp=null){
        await this.#do_operation(timer_id, "deleted", timestamp);
    }
    async findAll(){
        const sql = "SELECT * FROM timer_log";
        const params = [];
        return await this.query(sql, params);
    }
    async findByTimerId(timer_id){
        const sql = "SELECT * FROM timer_log WHERE timer_id= ?";
        const params = [timer_id];
        return await this.query(sql, params);
    }
    async findByTimerIdAndHour(timer_id, time){
        const start_time = DateTimeDto(time.y, time.m, time.d, time.hh, 0, 0);
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND DATE_ADD(?, INTERVAL 1 HOUR )";
        const params = [timer_id, start_time.timeString, start_time.timeString];
        return await this.query(sql, params);
    }
    async findByTimerIdAndDate(timer_id, date){
        const start_time = DateTimeDto(date.y, date.m, date.d, 0, 0, 0);
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND DATE_ADD(?, INTERVAL 1 DAY )";
        const params = [timer_id, start_time.timeString, start_time.timeString];
        return await this.query(sql, params);
    }
    async findByTimerIdAndTimeInterval(timer_id, start_time, end_time){
        const sql = "SELECT * FROM timer_log WHERE timer_id= ? AND timer_log_time BETWEEN ? AND ?";
        const params = [timer_id, start_time.timeString, end_time.timeString];
        return await this.query(sql, params);
    }
}

module.exports = TimerLogRepository;