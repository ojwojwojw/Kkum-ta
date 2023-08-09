const Repository = require("./repository");

class StopwatchLogRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql = `
    CREATE TABLE IF NOT EXISTS stopwatch_log_tbl (
      log_key INT(11) NOT NULL AUTO_INCREMENT,
      group_key INT(11) NOT NULL,
      operation VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
      log_time DATETIME(3) NOT NULL DEFAULT current_timestamp(3),
      PRIMARY KEY (component_log_key) USING BTREE,
      INDEX log_time(log_time) USING BTREE
    )
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    `;
    await this.query(sql, []);
  }
  async insert(group_key, operation) {
    const sql = `INSERT INTO component_log_tbl(group_key, operation) VALUES(?, ?)`;
    const params = [group_key, operation];
    const [row] = await this.query(sql, params);
    return row.insertId;
  }
  async getById(group_key) {
    const sql = "SELECT * FROM component_log_tbl WHERE group_key = ?";
    const params = [group_key];
    return this.query(sql, params);
  }
  validateTime(time) {
    if (!(typeof time === "string")) {
      return false;
    }
    if (
      !time.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/)
    ) {
      return false;
    }
    if (Date.parse(time) === NaN) {
      return false;
    }
    return true;
  }
  async getIdAndBeginTime(groupKey, beginTime){
    if (!this.validateTime(beginTime)) {
      throw new Error(
        `begin time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${beginTime}`
      );
    }
    const sql = `SELECT operation, log_time FROM component_log_tbl WHERE group_key = ?
    AND log_time BETWEEN COALESCE(
      (
        SELECT MAX(log_time) FROM component_log_tbl
        WHERE group_key = ? AND log_time < ?
      ), ?
    ) AND NOW();
    `;
    const params = [groupKey, groupKey, beginTime, beginTime];
    return this.query(sql, params);
  }

  async getIdAndTimes(groupKey, beginTime, endTime){
    if (!this.validateTime(beginTime)) {
      throw new Error(
        `begin time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${beginTime}`
      );
    }
    if (!this.validateTime(endTime)) {
      throw new Error(
        `end time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${endTime}`
      );
    }
    const sql = `
    SELECT operation, log_time FROM component_log_tbl WHERE group_key = ?
    AND log_time BETWEEN COALESCE(
      (
        SELECT MAX(log_time)
        FROM component_log_tbl
        WHERE group_key = ?
        AND log_time < ?
      ), ?
    ) AND ?;
    `;
    const params = [groupKey, groupKey, beginTime, beginTime, endTime];
    return this.query(sql, params);
  };
  async getByIdAndTime(groupKey, beginTime, endTime = null) {
    if (endTime === null) {
      return this.getIdAndBeginTime(groupKey, beginTime);
    } else {
      return this.getIdAndTimes(groupKey, beginTime, endTime);
    }
  }
}

module.exports = StopwatchLogRepository;
