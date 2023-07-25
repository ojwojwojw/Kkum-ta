const mysql = require('mysql2/promise');
const options = require('../config/connection.js');

class TimerRepository{
    TimerRepository(){
        this.pool = mysql.createPool(options);
    }
    async beginTransaction(){
        const conn = await this.pool.getConnection();
        conn.beginTransaction(); 
        return conn;
    }   
    rollback(conn){
        conn.rollback();
        conn.endTransaction();
    }
    commit(conn){
        conn.commit();
        conn.endTransaction();
    }
}

module.exports = TimerRepository;