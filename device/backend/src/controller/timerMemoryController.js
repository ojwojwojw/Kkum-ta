const express = require("express");
const ModuleService = require("../service/moduleService");
const moduleRouter = express.Router();

const moduleService = new ModuleService();

moduleRouter.get("/", async (req, res) => {
  return res.json(moduleService.getAll());
});

moduleRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = moduleService.getById(id);
  if(item === null){
    return res.status(404).json({status:"not found"});
  }
  return res.json(moduleService.getById(id));
});

moduleRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  moduleService.deleteById(id);
  return res.json({ status: "ok" });
});

moduleRouter.post("/", async (req, res) => {
  const type = req.body.type;
  const initTime = req.body.initTime;
  const maxIter = req.body.maxIter;
  let id;
  switch (type) {
    case "timer":
      id = moduleService.createTimer(initTime, maxIter);
      return res.json({ status: "ok", id: id });
    case "stopwatch":
      id = moduleService.createStopwatch(initTime);
      return res.json({ status: "ok", id: id });
    default:
      return res.status(404).json({ status: "not found" });
  }
});

moduleRouter.post("/operation/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const operation = req.body.operation;
  if(operation === "tag"){
    const { next } = moduleService.tag(id);
    return res.json({ status: "ok", next });
  }
  let result;
  switch (operation) {
    case "start":
      result = moduleService.start(id);
      if(result){
        return res.json({ status: "ok" });
      }
      else{
        return res.json({status: "fail"});
      }
    case "pause":
      result = moduleService.pause(id);
      if(result){
        return res.json({ status: "ok" });
      }
      else{
        return res.json({status: "fail"});
      }
    case "stop":
      result = moduleService.stop(id);
      if(result){
        return res.json({ status: "ok" });
      }
      else{
        return res.json({status: "fail"});
      }
    default:
      return res.status(400).json({status:"invalid operation"});
  }
});

module.exports = moduleRouter;
