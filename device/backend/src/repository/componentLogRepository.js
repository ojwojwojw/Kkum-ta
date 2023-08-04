const Repository = require("./repository");

class ComponentLogRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql =`
    CREATE TABLE IF NOT EXISTS component_log_tbl (
      component_log_key INT(11) NOT NULL AUTO_INCREMENT,
      component_key INT(11) NOT NULL,
      operation VARCHAR(50) NOT NULL,
      log_time DATETIME NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (component_log_key) USING BTREE,
      INDEX log_time(log_time) USING BTREE
    )
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    `
    await this.query(sql, []);
  }
  async insert(component_key, operation){
    const sql = `INSERT INTO component_log_tbl(component_key, operation) VALUES(?, ?)`;
    const params = [component_key, operation];
    const [row] = await this.query(sql, params);
    return row.insertId;
  }
  async getById(component_key){
    const sql = "SELECT * FROM component_log_tbl WHERE component_key = ?";
    const params = [component_key];
    return this.query(sql, params);
  }
  validateTime(time){
    if(!(typeof(time) === "string")){
      return false;
    } if(!time.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/)){
      return false;
    } if(Date.parse(time) === NaN){
      return false;
    }
    return true;
  }
  async getByIdAndBeginTime(component_key, begin_time){
    if(!this.validateTime(begin_time)){
      throw new Error(`begin_time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${begin_time}`);
    }
    const sql = "SELECT * FROM component_log_tbl WHERE component_key = ? AND log_time BETWEEN ? AND NOW()";
    const params = [component_key, begin_time]
    return this.query(sql, params);
  }

  async getByIdAndTime(component_key, begin_time, end_time=null){
    if(end_time === null){
      return this.getByIdAndBeginTime(component_key, begin_time);
    }
    else{
      if(!this.validateTime(begin_time)){
        throw new Error(`begin_time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${begin_time}`);
      }
      if(!this.validateTime(end_time)){
        throw new Error(`end_time is not in a valid format(YYYY-MM-DD hh:mm:ss), ${end_time}`);
      }
      const sql = "SELECT * FROM component_log_tbl WHERE component_key = ? AND log_time BETWEEN ? AND ?";
      const params = [component_key, begin_time, end_time];
      return this.query(sql, params);
    }
  }
}

module.exports = ComponentLogRepository;
