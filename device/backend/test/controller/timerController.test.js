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

  test("User can fix the total time of the timer", async () => {
    const result = await axios.post("timer/", {
      name: "test",
      total_time: "30000000",
    });
    const id = result.data.timer_id;

    await axios.put(`/timer/${id}`, {name:"testFixed", total_time:"123454321"});
    const fixedResult = await axios.get(`timer/${id}`);
    expect(fixedResult.data.timer_id).toBe(id);
    expect([fixedResult.data.name, fixedResult.data.total_time]).toStrictEqual(["testFixed", 123454321]);
    expect(fixedResult.data.state).toBe("stop");
    expect(fixedResult.data.left_time).toBe(123454321);

    await axios.delete(`timer/${id}`);
  });
  test("User can get timers by name of the timer", async () => {
    const name = Math.random().toString(36).slice(2, 10);
    const result = await axios.post("timer/", {
      name,
      total_time: "30000000",
    });
    const id = result.data.timer_id;
    const getByName = await axios.get(`timer/name/${name}`)
    expect(getByName.status).toBe(200);
    const cmp = (obj1, obj2) =>{
      const key1 = Object.keys(obj1);
      const key2 = Object.keys(obj2);
      if(key1.length != key2.length) return false;
      for(let key in key1){
        if(obj1[key] != obj2[key]) return false;
      } 
      return true;
    }
    const find = (obj1) =>{
      return cmp(obj1, {
        timer_id: id,
        name: name,
        total_time: 30000000,
        state: "stop",
        left_time: 30000000
      })
    }
    expect(getByName.data.some(find)).toBe(true);
    await axios.delete(`timer/${id}`);
  });
});
