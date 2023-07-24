const TimerLogRepository = require('../../src/repository/timerLogRepository.js');
let timerLogRepository = null;

beforeEach(()=>{
    timerLogRepository = new TimerLogRepository();
})

afterEach(async ()=>{
    await timerLogRepository.destroy();
    timerLogRepository = null;
});

test('init works', async ()=>{
    await timerLogRepository.init();
});

test('do_operation does not work if the timer_id is not valid', async ()=>{
    throw "NotTested";
});

test('rollback does not affect the real database', async ()=>{
    throw "NotTested";
});