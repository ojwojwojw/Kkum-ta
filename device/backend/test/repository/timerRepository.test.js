test(async ()=>{
    const timer = require("../src/repository/timerRepository");

    const tim = new timer();
    console.log(await tim.findAll());
});