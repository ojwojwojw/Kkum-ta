const mysql = require('mysql2/promise');
const options = require('../config/connection.js');

class Repository{
    constructor(){
        this.pool = mysql.createPool(options);
        this.conn = null;
    }
    async closeDB(){
        await this.pool.end();
        this.pool = null;
        this.conn = null;
    }

    async query(sql, params){
        const conn = this.conn ? this.conn : await this.pool.getConnection()
        const result = await conn.execute(sql, params);
        if(!this.conn){
            conn.release();
        }
        return result;
    }
    async beginTransaction(){
        if(this.conn){
            throw "Transaction already begun";
        }
        this.conn = await this.pool.getConnection();
        this.conn.beginTransaction();
    }
    async rollback(){
        if(!this.conn){
            throw "No transaction were running";
        }
        await this.conn.rollback();
        await this.conn.release();
        this.conn = null;
    }
    async commit(){
        if(!this.conn){
            throw "No transaction were running";
        }
        await this.conn.commit();
        await this.conn.release();
        this.conn = null;
    }
};

module.exports = Repository;