const Repository = require("./repository.js");

class TimerRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql = "CREATE TABLE `timer_table` ("+
    "    `timer_id` INT(11) NOT NULL AUTO_INCREMENT,"+
    "    `name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',"+
    "    `total_time` INT(10) UNSIGNED NOT NULL,"+
    "    `state` CHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci',"+
    "    `left_time` INT(11) UNSIGNED NOT NULL,"+
    "    PRIMARY KEY (`timer_id`) USING BTREE"+
    ")"+
    "COLLATE='utf8mb4_general_ci'"+
    "ENGINE=InnoDB"+
    "AUTO_INCREMENT=10"+
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
    const sql = `INSERT INTO timer_table(name, total_time, state, left_time) VALUES (?, ?, "stop", ?)`;
    const params = [name, time, time];
    return this.query(sql, params);
  }
  async putTimer(id, name, time) {
    const sql = `UPDATE timer_table SET total_time= ?, name= ?, state=?, left_time=? WHERE timer_id = ?`;
    const params = [time, name, "stop", time, id];
    return this.query(sql, params);
  }

  async deleteTimer(timer_id) {
    const sql = "DELETE FROM timer_table WHERE timer_id = ?";
    const params = [timer_id];
    return this.query(sql, params);
  }

  async findTimerById(timer_id) {
    const sql = "SELECT * FROM timer_table WHERE timer_id = ?";
    const params = [timer_id];
    return this.query(sql, params);
  }

  async findTimerByName(timer_name) {
    const sql = "SELECT * FROM timer_table WHERE name = ?";
    const params = [timer_name];
    return this.query(sql, params);
  }
}

module.exports = TimerRepository;
