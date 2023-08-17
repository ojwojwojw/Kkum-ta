const express = require("express");
const Global = require("../global");
const synchroRouter = express.Router();

(async () => {
  synchroService = await Global.getSynchroService();
})();

synchroRouter.get("/", async (req, res) => {
  await synchroService.synchronizeDeviceAndServer();
  res.status(200).json({status: "ok"});
  return;
})

module.exports = synchroRouter;