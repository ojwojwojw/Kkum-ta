const Repository = require('./repository.js');

class TimerRepository extends Repository{
    constructor() {
        super();
    }
    async init(){
        const sql = "CREATE TABLE `timer_table` ("+
        "    `timer_id` INT(11) NOT NULL AUTO_INCREMENT,"+
        "    `time` INT(10) UNSIGNED NULL DEFAULT NULL,"+
        "    `timer_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',"+
        "    PRIMARY KEY (`timer_id`) USING BTREE"+
        ")"+
        "COLLATE='utf8_general_ci'"+
        "ENGINE=InnoDB"+
        ";"
        const params = [];
        return this.query(sql, params);
    }
    async findAll() {
        const sql = "SELECT * FROM timer_table";
        const params = [];
        return this.query(sql, params);
    }

    async createTimer(time, name) {
        const sql = "INSERT INTO timer_table VALUES(0, ?, ?)";
        const params = [time, name];
        return this.query(sql, params);
    }
    async putTimer(id, time){
        const sql = "UPDATE timer_table SET time= ? WHERE timer_id = ?";
        const params = [time, id];
        return this.query(sql, params);
    }

    async deleteTimer(timer_id) {
        const sql = "DELETE FROM timer_table WHERE timer_id = ?";
        const params = [timer_id];
        return this.query(sql, params);
    }

    async findTimerById(timer_id){
        const sql = "SELECT * FROM timer_table WHERE timer_id = ?";
        const params = [timer_id];
        return this.query(sql, params);
    }

    async getTimerByName(timer_name) {
        const sql = "SELECT * FROM timer_table WHERE timer_name = ?";
        const params = [timer_name];
        return this.query(sql, params);
    }

}

module.exports = TimerRepository;
