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
  beforeEach(() => {
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
        fail("do_operation does not throw anything.");
      })
      .catch((e) => {
        expect(e).toMatch(/^SQLError:/);
      });
  });
});
