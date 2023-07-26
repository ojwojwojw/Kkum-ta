const timer = require("../../src/repository/timerRepository");
test("?", async ()=>{

    const tim = new timer();
    await tim.findAll();
    tim.closeDB();
});