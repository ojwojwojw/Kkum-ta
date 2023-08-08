const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

const { REMOTE_HOST, REMOTE_PORT } = process.env;

module.exports = {host:REMOTE_HOST, port:REMOTE_PORT, endpoint:"http://" + REMOTE_HOST + ":" + REMOTE_PORT};