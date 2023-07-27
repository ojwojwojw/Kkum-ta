const app = require("../../app");
const axios = require("axios");

describe("app API for timer", () => {
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
  test("server runs", async () => {
    expect(server).toBeTruthy();
  });
  test("client can access server", async () => {
    const result = await axios.get("timer/");
    expect(result.status).toBe(200);
  });

  test("client can create and remove timer", async () => {
    const result = await axios.post("timer/", {
      name: "test",
      total_time: "30000000",
    });
    expect(result).toBeTruthy();
    const rData = result.data;
    expect(result.status).toBe(200);
    expect(rData.status).toBe("ok");
    expect(rData.timer_id).toBeTruthy();

    const timer = await axios.get(`timer/${rData.timer_id}`);
    const data = timer.data;
    expect(data).toBeTruthy();
    expect(data.timer_id).toBe(rData.timer_id);
    expect(data.name).toBe("test");
    expect(data.total_time).toBe(30000000);
    expect(data.state).toBe("stop");
    expect(data.left_time).toBe(data.total_time);

    const delResult = await axios.delete(`timer/${rData.timer_id}`);
    const dData = delResult.data;
    expect(dData).toBeTruthy();
    expect(delResult.status).toBe(200);
    expect(dData.status).toBe("ok");

    let afterDelResult;
    try {
      afterDelResult = await axios.get(`timer/${rData.time_id}`);
    } catch (e) {
      expect(e instanceof axios.AxiosError).toBe(true);
      expect(e.response.status).toBe(404);
    } finally {
      expect(afterDelResult).toBeFalsy();
    }
  });

  test("User can fix the remaining time of the timer", async () => {
    const result = await axios.post("timer/", {
      name: "test",
      total_time: "30000000",
    });
    const id = result.data.timer_id;
  });
});
