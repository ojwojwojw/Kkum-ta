const Repository = require("./repository");

class ComponentLogRepository extends Repository {
  constructor() {
    super();
  }
  async init() {
    const sql =`
    CREATE TABLE component_log_tbl (
      component_log_key INT(11) NOT NULL,
      component_key INT(11) NOT NULL,
      operation VARCHAR(50) NOT NULL,
      log_time DATETIME NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (component_log_key) USING BTREE,
      INDEX log_time(log_time) USING BTREE,
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
}

module.exports = ComponentLogRepository;
