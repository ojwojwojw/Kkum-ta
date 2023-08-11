const fs = require('fs');
const { exit } = require('process');
if(!fs.existsSync("./src/config/.env")){
    console.log(`Cannot open file "./src/config/.env".
Please make sure if this file exists.
This file contains:
    MYSQL_HOST={Your MySQL Host}
    MYSQL_USER={Your MySQL User name}
    MYSQL_PW={Your MySQL User password}
    MYSQL_DB={Name of table you want to use}`);
    exit(1);
}
const app = require('./app');
const PORT = 8085;

app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));

module.exports = app;