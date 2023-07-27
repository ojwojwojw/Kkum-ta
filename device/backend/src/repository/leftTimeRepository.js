const Repository = require("./repository.js");

class LeftTimeRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql =
      "CREATE TABLE IF NOT EXISTS `left_time` (" +
      "`timer_id` INT(11) NOT NULL," +
      "`state` CHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci'," +
      "`left_time` INT(11) NULL DEFAULT '0'," +
      "PRIMARY KEY (`timer_id`) USING BTREE," +
      "CONSTRAINT `FK_left_time_timer_id` FOREIGN KEY (`timer_id`)" +
      "REFERENCES `timer_table` (`timer_id`)" +
      "ON UPDATE NO ACTION ON DELETE CASCADE" +
      ")" +
      "COLLATE='utf8mb4_general_ci'" +
      "ENGINE=InnoDB" +
      ";";
    await this.query(sql, []);
  }
  async get(timer_id) {
    const sql = "SELECT * FROM left_time WHERE timer_id = ?";
    const params = [timer_id];
    return this.query(sql, params);
  }
  async set(timer_id, state, left_time) {
    const sql =
      "INSERT INTO left_time(timer_id, state, left_time)"+
        "VALUES (?, ?, ?)"+
        "ON DUPLICATE KEY UPDATE left_time=?";
    const params = [timer_id, state, left_time, left_time];
    if (state !== "running" && state !== "stop") {
      throw new Error(`state can have value of "running" or "stop" only.`);
    }
    return this.query(sql, params);
  }
  async findAll() {
    const sql = 'INSERT INTO left_time (timer_id, state, left_time)\n'+
                'SELECT t.timer_id AS timer_id, "stop", t.time AS left_time\n'+
                'FROM timer_table t LEFT JOIN left_time l\n'+
                'ON t.timer_id = l.timer_id\n'+
                'WHERE l.timer_id IS NULL;'
    const params = [];
    await this.query(sql, params);
    const sql2 = 'SELECT * FROM timer_table NATURAL JOIN left_time;';
    return this.query(sql2, params);
  }
  async findTimerByName(name) {
    const sql = 'INSERT INTO left_time (timer_id, state, left_time)\n'+
                'SELECT t.timer_id AS timer_id, "stop", t.time AS left_time\n'+
                'FROM timer_table t LEFT JOIN left_time l\n'+
                'ON t.timer_id = l.timer_id\n'+
                'WHERE l.timer_id IS NULL;'
    await this.query(sql, []);
    const sql2 =
      "SELECT * FROM timer_table NATURAL JOIN left_time WHERE timer_name=?";
    const params = [name];
    return this.query(sql2, params);
  }
}

module.exports = LeftTimeRepository;
