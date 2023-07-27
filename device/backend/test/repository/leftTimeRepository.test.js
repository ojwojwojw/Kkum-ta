const TimerRepository = require('../../src/repository/timerRepository');
const LeftTimeRepository = require('../../src/repository/leftTimeRepository');

test("Getter, Setter Works", async ()=>{
    const repo = new LeftTimeRepository();
    const timer = new TimerRepository();

    const [rows] = await timer.createTimer(123456000, "test:leftTimeRepositroy");
    const r_id = rows.insertId;
    await repo.set(r_id, "running", 32015000);
    const [rrows] = await repo.get(r_id);
    expect(rrows[0].left_time).toBe(32015000);
    await timer.deleteTimer(r_id);

    await repo.closeDB();
    await timer.closeDB();
});

test("INSERT ... ON DUPLICATE KEY UPDATE works ", async ()=>{
    const repo = new LeftTimeRepository();
    const timer = new TimerRepository();
    const [rows] = await timer.createTimer(123456000, "test:leftTimeRepositroy");
    const r_id = rows.insertId;
    await repo.set(r_id, "running", 32015000);
    const [rrows] = await repo.get(r_id);
    expect(rrows[0].left_time).toBe(32015000);
    await repo.set(r_id, "running", 32345000);
    const [r2rows] = await repo.get(r_id);
    expect(r2rows[0].left_time).toBe(32345000);
    await timer.deleteTimer(r_id);

    await repo.closeDB();
    await timer.closeDB();
});