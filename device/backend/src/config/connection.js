const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

const MYSQL_HOST = "i9c101.p.ssafy.io";
const MYSQL_USER = "kronos";
const MYSQL_PW = "1111";
const MYSQL_DB = "timer";

const options = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
    connectionLimit: 30,
};

module.exports = options;
