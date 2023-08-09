const Repository = require("./repository");

class StudyHourlyRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql = `CREATE TABLE IF NOT EXISTS study_hourly_tbl (
            group_key INT(11) NOT NULL,
            date DATE NOT NULL,
            hour INT(11) NOT NULL DEFAULT 0,
            portion FLOAT NOT NULL DEFAULT 0,
            PRIMARY KEY (group_key, date, hour) USING BTREE,
            INDEX group_key_date (group_key, date) USING BTREE,
            INDEX date(date) USING BTREE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`;
        await this.query(sql, []);
    }
    async setHourlyStudytime(group_key, date, hour, portion){
        if(typeof(date) !== "string" || date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null){
            throw new Error(`date is not valid (date=${date})`);
        }
        if(typeof(hour) !== "number" || hour < 0 || hour > 24){
            throw new Error(`hour is not valid (hour=${hour})`);
        }
        if(typeof(portion) !== "number" || portion < 0 || portion > 1){
            throw new Error(`portion is not valid(it should be between 0 and 1) (portion=${portion})`);
        }
        const sql = `INSERT INTO study_hourly_tbl (group_key, date, hour, portion) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE portion=?;`;
        const [rows] = await this.query(sql, [group_key, date, hour, portion, portion]);
        return rows.insertId;
    }
    async getHourlyStudytime(group_key, date, hour){
        if(typeof(date) !== "string" || date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null){
            throw new Error(`date is not valid (date=${date})`);
        }
        if(typeof(hour) !== "number" || hour < 0 || hour > 24){
            throw new Error(`hour is not valid (hour=${hour})`);
        }
        const sql = `SELECT portion FROM study_hourly_tbl WHERE group_key=? AND date=? AND hour=? ORDER BY hour ASC;`;
        const params = [group_key, date, hour];
        const [rows] = await this.query(sql, params);
        if(rows.length === 0){
            return 0;
        }
        else{
            return rows[0].portion;
        }
    }
    async getDailyStudytime(group_key, date){
        if(typeof(date) !== "string" || date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null){
            throw new Error(`date is not valid (date=${date})`);
        }
        const sql = `SELECT hour, portion FROM study_hourly_tbl WHERE group_key=? AND date=? ORDER BY date ASC;`;
        const params = [group_key, date];
        const [rows] = await this.query(sql, params);
        const result = new Array(24).fill(0);
        rows.map(item=>{result[item.hour] = item.portion});
        return rows;
    }
    async getMonthlyStudytime(group_key, year, month){
        if(!Number.isInteger(year)){
            throw new Error(`year is not valid (year=${year})`);
        }
        if(!Number.isInteger(month)){
            throw new Error(`month is not valid (month=${month})`);
        }
        const sql = `
        SELECT DAY(date) AS day, avg(portion) AS portion
        FROM study_hourly_tbl
        GROUP BY group_key, date
        HAVING group_key=? AND YEAR(date)=? AND MONTH(date)=?
        ;`
        const params = [group_key, year, month];
        const [rows] = await this.query(sql, params);
        const result = new Array(new Date(year, month, 0).getDate()).fill(0);
        rows.map(item=>{result[item.day - 1] = item.portion;})
        return result;
    }
    isLeapYear(year){
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    async getYearlyStudytime(group_key, year){
        if(!Number.isInteger(year)){
            throw new Error(`year is not valid (year=${year})`);
        }
        const sql = `
        SELECT DATEDIFF(DATE, MAKEDATE(YEAR(DATE), 1)) AS date, avg(portion) AS portion
        FROM study_hourly_tbl
        GROUP BY group_key, date
        HAVING group_key=? AND YEAR(date)=?
        ORDER BY date ASC
        ;`;
        const params = [group_key, year];
        const [rows] = await this.query(sql, params);
        const result = new Array(this.isLeapYear(year)?366:365).fill(0);
        rows.map(item=>{result[item.date]=item.portion;});
        return result;
    }
}

module.exports = StudyHourlyRepository;