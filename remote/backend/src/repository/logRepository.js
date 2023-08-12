const Repository = require("./repository");

class  LogRepository extends Repository{
    constructor(){
        super();
    }
    async init(){
        const sql = `CREATE TABLE IF NOT EXISTS log_tbl (
            group_key INT(11) NOT NULL,
            date DATE NOT NULL,
            hour INT(11) NOT NULL,
            user_key INT(11) NULL DEFAULT NULL,
            portion FLOAT NULL DEFAULT NULL,
            PRIMARY KEY (group_key, date, hour) USING BTREE,
            INDEX FK_log_group (group_key, user_key) USING BTREE,
            CONSTRAINT FK_log_group FOREIGN KEY (group_key, user_key) REFERENCES group_tbl (group_key, user_key) ON UPDATE NO ACTION ON DELETE CASCADE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`
        await this.query(sql, []);
    }

    async insertLog(user_key, group_key, date, hour, portion){
        const sql = `
        INSERT INTO log_tbl(group_key, date, hour, user_key, portion)
        VALUES(?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE portion=?`;
        const params = [group_key, date, hour, user_key, portion, portion];
        console.log(sql, params);
        this.query(sql, params);
        return;
    }

    async insertLogs(itemArray){
        itemArray.forEach((item)=>{
            this.insertLog(item.user_key, item.group_key, item.date, item.hour, item.portion);
        })
        return;
    }

    async getHourlyStudytime(user_key, group_key, date, hour){
        if(typeof(date) !== "string" || date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null){
            throw new Error(`date is not valid (date=${date})`);
        }
        if(typeof(hour) !== "number" || hour < 0 || hour > 24){
            throw new Error(`hour is not valid (hour=${hour})`);
        }
        const sql = `SELECT portion FROM study_hourly_tbl_${version} WHERE group_key=? AND date=? AND hour=? ORDER BY hour ASC;`;
        const params = [group_key, date, hour];
        const [rows] = await this.query(sql, params);
        if(rows.length === 0){
            return 0;
        }
        else{
            return rows[0].portion;
        }
    }
    async getDailyStudytime(user_key, group_key, date){
        if(typeof(date) !== "string" || date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null){
            throw new Error(`date is not valid (date=${date})`);
        }
        const sql = `SELECT hour, portion FROM study_hourly_tbl_${version} WHERE group_key=? AND date=? ORDER BY date ASC;`;
        const params = [group_key, date];
        const [rows] = await this.query(sql, params);
        const result = new Array(24).fill(0);
        rows.map(item=>{result[item.hour] = item.portion});
        return rows;
    }
    async getMonthlyStudytime(user_key, group_key, year, month){
        if(!Number.isInteger(year)){
            throw new Error(`year is not valid (year=${year})`);
        }
        if(!Number.isInteger(month)){
            throw new Error(`month is not valid (month=${month})`);
        }
        const sql = `
        SELECT DAY(date) AS day, avg(portion) AS portion
        FROM study_hourly_tbl_${version}
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
    async getYearlyStudytime(user_key, group_key, year){
        if(!Number.isInteger(year)){
            throw new Error(`year is not valid (year=${year})`);
        }
        const sql = `
        SELECT DATEDIFF(DATE, MAKEDATE(YEAR(DATE), 1)) AS date, avg(portion) AS portion
        FROM study_hourly_tbl_${version}
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

module.exports = LogRepository;