const Repository = require("./repository");

class ComponentRepository extends Repository{
    constructor(groupRepository){
        super();
        this.groupRepository = groupRepository;
        this.init();
    }
    async init(){
        const sql = `
        CREATE TABLE IF NOT EXISTS component_tbl (
            component_key INT(11) NOT NULL,
            group_key INT(11) NOT NULL DEFAULT '0',
            component_type INT(11) NOT NULL,
            PRIMARY KEY (component_key) USING BTREE,
            INDEX FK_component_group (group_key) USING BTREE,
            CONSTRAINT FK_component_group FOREIGN KEY (group_key) REFERENCES group_tbl(group_key) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT component_type_in CHECK (component_type = 'timer'/'stopwatch')
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`;
        this.query(sql, []);
    }
    async getById(id){
        const sql = "SELECT * FROM component_tbl WHERE component_key=?";
        const params = [id];
        return this.query(sql, parmas);
    }
    async getAll(){
        const sql = "SELECT * FROM component_tbl";
        return this.query(sql, []);
    }
    async insert(group_key=0, component_type){
        const sql = `INSERT INTO component_tbl(group_key, component_type) VALUES(?, ?)`;
        const params = [group_key, component_type];
        return this.query(sql, params);
    }
    async deleteById(id){
        const sql = `DELETE FROM component_tbl WHERE component_key=?`
        const params = [id];
        return this.query(sql, params);
    }
};

module.exports = ComponentRepository;