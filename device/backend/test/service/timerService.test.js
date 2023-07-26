const TimerService = require("../../src/service/timerService");

describe("Test for timerService", () => {
  test("User can insert and delete timer", async () => {
    const timerService = new TimerService();
    const timer = await timerService.createTimer("test", 30000000);
    const found = await timerService.getTimerById(timer.timer_id);
    expect(JSON.stringify(found)).toBe(JSON.stringify({
        "timer_id":timer.timer_id,
        "name": "test",
        "total_time":30000000,
        "state":"stop",
        "left_time" :30000000
    }));
    await timerService.deleteTimer(timer.timer_id);
    
  });
});
