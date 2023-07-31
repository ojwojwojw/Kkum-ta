const TimerLogRepository = require("../../src/repository/timerLogRepository.js");
const TimerRepository = require("../../src/repository/timerRepository.js");
let timerLogRepository = null;
let timerRepository = null;

describe("TimerLogRepository initialization", () => {
  beforeEach(() => {
    timerLogRepository = new TimerLogRepository();
  });

  afterEach(async () => {
    await timerLogRepository.closeDB();
    timerLogRepository = null;
  });

  test("init works", async () => {
    await timerLogRepository.init();
  });
});

describe("database management", () => {
  beforeEach(async () => {
    timerLogRepository = new TimerLogRepository();
    timerRepository = new TimerRepository();
  });

  afterEach(async () => {
    await timerLogRepository.closeDB();
    timerLogRepository = null;
    await timerRepository.closeDB();
    timerRepository = null;
  });

  test("do_operation does not work if the timer_id is not valid", async () => {
    const promise = timerLogRepository.start(-1);
    await promise
      .then(() => {
        throw new Error("do_operation did not throw anything.");
      })
      .catch((e) => {
        expect(e.message).toMatch(/^SQLError:/);
      });
  });
  test("timerLogRepository is safe from SQL injection", async ()=>{
    await timerRepository.beginTransaction();
    await timerRepository.createTimer(180000000, "라면 타이머");
    const [rows] = await timerRepository.findAll();
    expect(rows.length).toBeGreaterThanOrEqual(1);
    const pid = rows[0].timer_id;
    try{
      await timerLogRepository.start(
        `${pid});DELETE FROM timer_log WHERE 1=1;-- `
      );
    }
    catch(e){
      expect(e.message).toMatch(/^SQLError: Cannot insert into database,/);
    }
    finally{
      await timerRepository.rollback();
    }
  });
});