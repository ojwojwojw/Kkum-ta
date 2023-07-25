const mysql = require('mysql2/promise');
const options = require('../config/connection.js');

class UserRepository{
    constructor(){
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

    async findAll(){
        const query = await this.pool.query(`SELECT * FROM user_table`);
        return query;
    }

    async getUserById(id){
		try{
			const conn = await this.pool.getConnection();
			const sql = "SELECT * FROM user_table WHERE id = ?";
			const params = [id];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}
	
	async getUserByEmail(email){
		try{
			const conn = await this.pool.getConnection();
			const sql = "SELECT * FROM user_table WHERE email= ?";
			const params = [email];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}

    async getUserBySerial(Device_Serial){
		try{
			const conn = await this.pool.getConnection();
			const sql = "SELECT * FROM user_table WHERE Device_Serial= ?";
			const params = [Device_Serial];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}

	async insertUser(id, salt, hashedPw, Device_Serial, email){
		let conn;
		const sql = "INSERT INTO user_table(id, salt, hashedPw, Device_Serial, email) VALUES (?, ?, ?, ?, ?)";
		const params = [id, salt, hashedPw, Device_Serial, email];
		try{
			conn = await this.pool.getConnection();
		} catch(err){
			throw err;
		}
		try{
			await conn.execute(sql, params);
			conn.release();
		} catch(err){
			console.error(err);
		}
		return true;
	}

	async deleteUserById(id){
		try{
			const conn = await db.getConnection();
			const sql = "DROP FROM user_table WHER id = ?";
			const params = [id];
			const [rows, fields] = await conn.execute(sql, params);
		} catch(err){
			throw err;
		}
	}

}

module.exports = UserRepository;