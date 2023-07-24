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
    const promise = timerLogRepository.start(-1);
    await promise.then(()=>{
        fail("do_operation does not throw anything.");
    })
    .catch(e=>{
        expect(e).toMatch(/^SQLError:/);
    })
});

test('rollback does not affect the real database', async ()=>{
    throw "NotTested";
});