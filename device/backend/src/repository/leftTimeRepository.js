const Repository = require('./repository.js');

class LeftTimeRepository extends Repository{
    constructor(){
        super();
    };
    async init(){
        const sql = "CREATE TABLE IF NOT EXISTS `left_time` (\
            `timer_id` INT(11) NOT NULL,\
            `state` CHAR(6) NOT NULL COLLATE 'utf8mb4_general_ci',\
            `time` TIME NOT NULL,\
            PRIMARY KEY (`timer_id`) USING BTREE,\
            CONSTRAINT `FK_left_time_timer_id`\
            FOREIGN KEY (`timer_id`) REFERENCES `timer_table` (`timer_id`)\
            ON UPDATE NO ACTION ON DELETE NO ACTION\
        )\
        COLLATE='utf8mb4_general_ci'\
        ENGINE=InnoDB\
        ;"
        await this.query(sql, []);
    }
    async get(timer_id){
        const sql = "SELECT * FROM left_time WHERE timer_id = ?";
        const params = [timer_id];
        return await this.query(sql, params);
    }
    async set(timer_id, state, hour, minute, second){
        const left_time = `${hour}:${minute}:${second}`;
        if(hour < 0 || minute < 0 || second < 0){
            throw `Invalid Time (${left_time})`;
        }
        const sql = "INSERT INTO left_time(timer_id, state, left_time)\
        VALUES (?, ?, ?)\
        ON DUPLICATE KEY UPDATE left_time=?"
        const params = [timer_id, state, left_time, left_time];
        if(state !== "running" && state !== "stop"){
            throw `state can have value of "running" or "stop" only.`;
        }
        return await this.query(sql, params);
    }
    async findAll(){
        const sql = "SELECT * FROM timer_table NATURAL JOIN left_time;";
        const params = [];
        return await this.query(sql, params);
    }
}

module.exports = LeftTimeRepository;