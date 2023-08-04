const mysql = require("mysql2/promise");
const options = require("../config/connection.js");

class UserRepository {
  constructor() {
    this.pool = mysql.createPool(options);
  }

  async beginTransaction() {
    const conn = await this.pool.getConnection();
    conn.beginTransaction();

    return conn;
  }

  rollback(conn) {
    conn.rollback();
    conn.endTransaction();
  }

  commit(conn) {
    conn.commit();
    conn.endTransaction();
  }

  async findAll() {
    const query = await this.pool.query(`SELECT * FROM login_tbl`);
    return query;
  }

  async getUserById(id) {
    try {
      const conn = await this.pool.getConnection();
      const sql = "SELECT * FROM login_tbl WHERE id = ?";
      const params = [id];
      const [rows, fields] = await conn.execute(sql, params);
      conn.release();
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getUserByIdAndProvider(id, provider) {
    try {
      const conn = await this.pool.getConnection();
      const sql = "SELECT * FROM login_tbl WHERE id = ? AND provider = ?";
      const params = [id, provider];
      const [rows, fields] = await conn.execute(sql, params);
      conn.release();
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      const conn = await this.pool.getConnection();
      const sql = "SELECT * FROM login_tbl WHERE email= ?";
      const params = [email];
      const [rows, fields] = await conn.execute(sql, params);
      conn.release();
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async insertUser(id, salt, hashedPw, email, provider) {
    let conn;
    const sql =
      "INSERT INTO login_tbl(id, salt, hashedPw, email, provider) VALUES (?, ?, ?, ?, ?)";
    const params = [id, salt, hashedPw, email, provider];
    try {
      conn = await this.pool.getConnection();
    } catch (err) {
      throw err;
    }
    try {
      await conn.execute(sql, params);
      conn.release();
    } catch (err) {
      console.error(err);
    }
    return true;
  }

  async insertSNSUser(id, provider) {
    let conn;
    const sql = "INSERT INTO login_tbl(id, provider) VALUES (?, ?)";
    const params = [id, provider];
    try {
      conn = await this.pool.getConnection();
    } catch (err) {
      throw err;
    }
    try {
      await conn.execute(sql, params);
      conn.release();
    } catch (err) {
      console.error(err);
    }
    return true;
  }

  async deleteUserById(id) {
    try {
      const conn = await db.getConnection();
      const sql = "DELETE FROM login_tbl WHERE id = ?";
      const params = [id];
      const [rows, fields] = await conn.execute(sql, params);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserRepository;
