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
    timerRepository.beginTransaction();
  });

  afterEach(async () => {
    await timerLogRepository.closeDB();
    timerLogRepository = null;
    try{
      await timerRepository.rollback();
    } catch(e){}
    await timerRepository.closeDB();
    timerRepository = null;
  });

  test("do_operation does not work if the timer_id is not valid", async () => {
    const promise = timerLogRepository.start(-1);
    await promise
      .then(() => {
        throw "do_operation did not throw anything.";
      })
      .catch((e) => {
        expect(e).toMatch(/^SQLError:/);
      });
  });
});

describe("Security", ()=>{
  beforeEach(async ()=>{
    timerLogRepository = new TimerLogRepository();
    timerRepository = new TimerRepository();
    await timerRepository.beginTransaction();
  })
  afterEach(async ()=>{
    await timerLogRepository.closeDB();
    timerLogRepository = null;

    try{
      await timerRepository.rollback();
    } catch(e){}
    await timerRepository.closeDB();
    timerRepository = null;
  })
  test("timerLogRepository is safe from SQL injection", async ()=>{
    await timerRepository.registTimer("09:00:00", "18:00:00", "종일");
    const [rows, fields] = await timerRepository.findAll();
    expect(rows.length).toBeGreaterThanOrEqual(1);
    const pid = rows[0].timer_id;
    try{
      await timerLogRepository.start(
        `${pid});DELETE FROM timer_log WHERE 1=1;-- `
      );
    }
    catch(e){
      expect(e).toMatch(/^SQLError: Cannot insert into database,/);
    }
  });
})