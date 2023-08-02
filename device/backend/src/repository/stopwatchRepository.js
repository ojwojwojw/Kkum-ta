const Repository = require('./repository');

class StopwatchRepository extends Repository{
    constructor(componentRepository){
        super();
        this.componentRepository = componentRepository;
        this.init();
    }
    init(){
        const sql = `
        CREATE TABLE IF NOT EXISTS stopwatch_tbl(
            component_key INT(11) NOT NULL,
            cur_time INT(11) NOT NULL,
            PRIMARY KEY (component_key) USING BTREE,
            CONSTRAINT FK_stopwatch_component FOREIGN KEY (component_key)
            REFERENCES component_tbl(component_key)
            ON UPDATE NO ACTION ON DELETE CASCADE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        `
        this.query(sql, []);
    }
}
module.exports = StopwatchRepository;