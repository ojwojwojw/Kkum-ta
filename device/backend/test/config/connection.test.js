const connection = require("../../src/config/connection");

describe("db connection test", ()=>{
    test("connection file exists", ()=>{
        if(!connection.database){
            console.log("\
            Cannot read .env file at device/backend/src/config/.env.\n\
            Please make sure there is a file named .env at this directory\n\
            This .env file should look like\n\
            MYSQL_HOST=YourHostnameHere\n\
            MYSQL_USER=Username\n\
            MYSQL_PW=Password\n\
            MYSQL_DB=Databasename\n\
            ");
        }
        expect(connection.database).toBeTruthy();
    });
});