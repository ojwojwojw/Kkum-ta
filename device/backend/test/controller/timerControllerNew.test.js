const app = require("../../app");
const axios = require("axios");

describe("timer api test", ()=>{
    const PORT = 8088;
    axios.defaults.baseURL = `http://localhost:${PORT}`;
    let server = null;
    const closeServer = async () => {
      if (server) {
        await server.close();
        server = null;
      }
    };
    beforeEach(async () => {
      try {
        server = await app.listen(PORT);
      } catch (e) {
        console.error("Failed to open server: ", error);
      }
    });
    afterEach(async () => {
      await closeServer();
    });
    afterAll(async () => {
      await closeServer();
    });

    test("User can create and remove timer", async () => {
        const timerResp = await axios.post("/timer?group_id=0", {type: "timer", initTime:[1234, 1234, 123454321]});
        const stopwatchResp = await axios.post("/timer?group_id=0", {type:"stopwatch", initTime: 12345});

        const timer = timerResp.data;
        const stopwatch = stopwatchResp.data;
        expect(timer.status).toBe("ok");
        expect(stopwatch.status).toBe("ok");

        const timerId = timer.id;
        const stopwatchId = stopwatch.id;

        const delTimerResp = await axios.delete(`/timer/${timerId}`);
        const delStopWatchresp = await axios.delete(`/timer/${stopwatchId}`);
        expect(delTimerResp.data.status).toBe("ok");
        expect(delStopWatchresp.data.status).toBe("ok");
    });
    test("User cannot delete timer that does not exists", async () =>{
        try{
            const timerResp = await axios.delete("/timer/-1");
            expect(timerResp.data.status).toBe("not found");
        } catch(e){
            expect(e instanceof axios.AxiosError).toBe(true);
            expect(e.response.status).toBe(404);
        }
    })
    test("GET /timer/:timer_id", async ()=>{
        const timerResp = await axios.post("/timer", {type:"timer", initTime:[]})
    })
})