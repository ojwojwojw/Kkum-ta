const Repository = require('./repository.js');

class TimerRepository extends Repository{
    constructor() {
        super();
    }
    async findAll() {
        const sql = "SELECT * FROM timer_table";
        const params = [];
        return await this.query(sql, params);
    }

    async registTimer(start, end, name) {
        const sql = "INSERT INTO timer_table VALUES(0, ?, ?, ?)"
        const params = [start, end, name];
        return await this.query(sql, params);
    }

    async deleteTimer(timer_id) {
        const sql = "DELETE FROM timer_table WHERE timer_id = ?";
        const params = [timer_id];
        return await this.query(sql, params);
    }

    async findTimerByName(timer_name) {
        const sql = "SELECT timer_id FROM timer_table WHERE timer_name = ?";
        const params = [timer_name];
        return await this.query(sql, params);
    }

}

module.exports = TimerRepository;
