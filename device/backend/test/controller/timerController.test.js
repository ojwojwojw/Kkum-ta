const app = require("../../app");
const axios = require("axios");
test("app is ready", () => {
  expect(app).toBeTruthy();
});

describe("app API for timer", () => {
  const PORT = 8088;
  axios.defaults.baseURL = `http://localhost:${PORT}`
  let server = null;
  beforeEach(async ()=>{
    server = await app.listen(PORT);
  })
  afterEach(()=>{
    server.close();
  })
  test("server runs", async()=>{
    expect(server).toBeTruthy();
  })
  test("client can access server", async()=>{
    const result = await axios.get("timer/");
    expect(result.status).toBe(200);
    console.log(result.data);
  })
});
