const Repository = require("./repository");

const version = "v3";

class StopwatchLogRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql = `
    CREATE TABLE IF NOT EXISTS stopwatch_log_tbl_${version} (
      log_key INT(11) NOT NULL AUTO_INCREMENT,
      group_key INT(11) NOT NULL,
      operation VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
      log_time DATETIME(3) NOT NULL DEFAULT current_timestamp(3),
      PRIMARY KEY (log_key) USING BTREE,
      INDEX log_time(log_time) USING BTREE,
      INDEX idx_group_key_log_time (group_key, log_time) USING BTREE,
      INDEX idx_operation_log_time (operation, log_time) USING BTREE
    )
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    `;
    await this.query(sql, []);
  }
  async insert(group_key, operation) {
    const selectSql = `
      SELECT operation FROM stopwatch_log_tbl_${version} ORDER BY log_time DESC LIMIT 1;
    `
    const [selected] = await this.query(selectSql, []);
    if(selected.operation !== operation){
      const insertSql = `
      INSERT INTO stopwatch_log_tbl_${version} (group_key, operation) VALUES(?, ?)`;
      const params = [group_key, operation];
      const [rows] = await this.query(insertSql, params);
      return rows.insertId;
    }
    return null;
  }
  async getAllStartStopPair(){
    /*const sql = `
    SELECT t1.group_key, t1.log_time AS start_time,
       (SELECT t2.log_time FROM stopwatch_log_tbl_${version} t2
        WHERE t2.group_key = t1.group_key
          AND t2.log_time > t1.log_time
          AND t2.operation = 'stop'
        ORDER BY t2.log_time LIMIT 1) AS stop_time
    FROM stopwatch_log_tbl_${version} t1
    WHERE t1.operation = 'start'
    ORDER BY t1.group_key, t1.log_time;
    ;`;*/
    const sql = `SELECT group_key, log_time, operation
    FROM stopwatch_log_tbl_${version}
    ORDER BY log_time ASC`;
    const [result] = await this.query(sql, []);
    const startStopPairs = [];
    const startTimes = {};
    let lastUsedLogTime = new Date(0);

    for (const row of result) {
        if (row.operation === 'start') {
            if (!startTimes.hasOwnProperty(row.group_key)) {
                startTimes[row.group_key] = row.log_time;
            }
        } else if (row.operation === 'stop' && startTimes.hasOwnProperty(row.group_key)) {
            const startTime = startTimes[row.group_key];
            const stopTime = row.log_time;
            startStopPairs.push({
                group_key: row.group_key,
                start_time: startTime,
                stop_time: stopTime
            });
            delete startTimes[row.group_key];
            if (new Date(stopTime) > lastUsedLogTime) {
              lastUsedLogTime = new Date(stopTime);
            }
        }
    }
    const deleteSQL = `DELETE FROM stopwatch_log_tbl_${version} WHERE log_time <= ?;`;
    await this.query(deleteSQL, [lastUsedLogTime]);
    return [startStopPairs];
  }
}

module.exports = StopwatchLogRepository;
