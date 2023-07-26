const TimerRepository = require('../../src/repository/timerRepository');
const LeftTimeRepository = require('../../src/repository/leftTimeRepository');

test("Getter, Setter Works", async ()=>{
    const repo = new LeftTimeRepository();
    const timer = new TimerRepository();

    await repo.beginTransaction();
    const [rows, fields] = await timer.registTimer("12:34:56", "test:leftTimeRepositroy");
    const r_id = rows.insertId;
    await repo.set(r_id, "running", 3, 20, 15);
    const [rrows, rfields] = await repo.get(r_id);
    expect(rrows[0].left_time).toBe("03:20:15");
    await repo.rollback();
    await timer.deleteTimer(r_id);

    repo.closeDB();
    timer.closeDB();
});

test("INSERT ... ON DUPLICATE KEY UPDATE works ", async ()=>{
    const repo = new LeftTimeRepository();
    const timer = new TimerRepository();

    await repo.beginTransaction();
    const [rows, fields] = await timer.registTimer("12:34:56", "test:leftTimeRepositroy");
    const r_id = rows.insertId;
    await repo.set(r_id, "running", 3, 20, 15);
    const [rrows, rfields] = await repo.get(r_id);
    expect(rrows[0].left_time).toBe("03:20:15");
    await repo.set(r_id, "running", 3, 23, 45);
    const [r2rows, r2fields] = await repo.get(r_id);
    expect(r2rows[0].left_time).toBe("03:23:45");
    await repo.rollback();
    await timer.deleteTimer(r_id);

    repo.closeDB();
    timer.closeDB();
});