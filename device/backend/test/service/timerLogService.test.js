const TimerLogService = require("../../src/service/timerLogService");

describe("Test for timerService", () => {
  test("User can insert and delete timer", async () => {
    const timerLogService = new TimerLogService();
    const logS = await timerLogService.logTimerStarted(1)
    const logP = await timerLogService.logTimerPaused(1);
    
  });
});
