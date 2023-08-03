const express = require("express");
const Global = require("../global");
const moduleRouter = express.Router();


let moduleService;
(async()=>{
  moduleService = await Global.getModuleService();
})();

moduleRouter.get("/", async (req, res) => {
  return res.status(200).json(moduleService.getAll());
});

moduleRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const item = moduleService.getById(id);
  if(item === null){
    return res.status(404).json({status:"not found"});
  }
  return res.status(200).json(moduleService.getById(id));
});

moduleRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = moduleService.deleteById(id);
  if(result.ok)
    return res.status(400).json({ status: "ok" });
  else{
    return res.status(404).json({status:"not found"});
  }
});

moduleRouter.put("/:id", async (req, res)=>{
  const id = parseInt(req.params.id);
  const initTime = req.body.initTime;
  const result = await moduleService.putInitTime(id, initTime);
  if(result.ok){
    return res.status(200).json({status:"ok"});
  }
  else{
    return res.status(404).json({status: "not found"});
  }
});

moduleRouter.post("/", async (req, res) => {
  const type = req.body.type;
  const initTime = req.body.initTime;
  const maxIter = req.body.maxIter;
  let id;
  switch (type) {
    case "timer":
      id = await moduleService.createTimer(initTime, maxIter);
      return res.status(200).json({ status: "ok", id: id });
    case "stopwatch":
      id = await moduleService.createStopwatch(initTime);
      return res.status(200).json({ status: "ok", id: id });
    default:
      return res.status(200).status(404).json({ status: "not found" });
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
      if(result.ok){
        return res.status(200).json({ status: "ok" });
      }
      else{
        return res.status(204).json({status: "fail", message:result.message});
      }
    case "pause":
      result = moduleService.pause(id);
      if(result.ok){
        return res.status(200).json({ status: "ok" });
      }
      else{
        return res.status(204).json({status: "fail", message:result.message});
      }
    case "stop":
      result = moduleService.stop(id);
      if(result.ok){
        return res.status(200).json({ status: "ok" });
      }
      else{
        return res.status(204).json({status: "fail", message:result.message});
      }
    default:
      return res.status(400).json({status:"invalid operation"});
  }
});

module.exports = moduleRouter;
