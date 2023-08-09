const express = require("express");
const Global = require("../global");
const timerRouter = express.Router();


let componentService, componentLogService;
(async()=>{
  componentService = await Global.getComponentService();
  componentLogService = await Global.getComponentLogService();
})();

timerRouter.get("/", async (req, res) => {
  if(Object.is(parseInt(req.query.group_id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const group_id = parseInt(req.query.group_id);
  if(group_id){
    res.status(200).json(componentService.getByGroup(parseInt(group_id)));
    return;
  }
  else{
    res.status(200).json(componentService.getAll());
    return;
  }
});

timerRouter.get("/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const id = parseInt(req.params.id);
  const item = componentService.getById(id);
  if(item === null){
    res.status(404).json({status:"not found"});
    return;
  }
  else{
    res.status(200).json(item);
    return;
  }
});

timerRouter.delete("/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const id = parseInt(req.params.id);
  const result = await componentService.deleteById(id);
  if(result.ok){
    res.status(200).json({ status: "ok" });
    await componentLogService.log(id, "deleted");
    return;
  } else{
    res.status(404).json({status:"not found"});
    return;
  }
});

timerRouter.put("/:id", async (req, res)=>{
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const id = parseInt(req.params.id);
  const initTime = req.body.initTime;
  const result = await componentService.putInitTime(id, initTime);
  if(result.ok){
    res.status(200).json({status:"ok"});
    await componentLogService.log(id, "fix");
    return;
  }
  else{
    res.status(404).json({status: "not found"});
    return;
  }
});

timerRouter.post("/", async (req, res) => {
  const group_id = req.query.group_id;
  const type = req.body.type;
  const initTime = req.body.initTime;
  const maxIter = req.body.maxIter;
  let id;
  switch (type) {
    case "timer":
      id = await componentService.createTimer(initTime, maxIter, parseInt(group_id));
      res.status(200).json({ status: "ok", id: id });
      await componentLogService.log(id, "created");
      return;
    case "stopwatch":
      id = await componentService.createStopwatch(initTime, parseInt(group_id));
      res.status(200).json({ status: "ok", id: id });
      await componentLogService.log(id, "created");
      return;
    default:
      res.status(404).json({ status: `Invalid type ${type}` });
      return;
  }
});

timerRouter.post("/operation/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:`invalid parameter id(${id})`});
  }
  const id = parseInt(req.params.id);
  const operation = req.body.operation;
  if(operation === "tag"){
    const { next } = componentService.tag(id);
    res.json({ status: "ok", next });
    await componentLogService.log(id, "tag");
    return;
  }
  let result;
  switch (operation) {
    case "start":
      result = componentService.start(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        await componentLogService.log(id, "start");
        return;
      }
      else{
        res.status(204).json({status: "fail", message:result.message});
        return;
      }
    case "pause":
      result = componentService.pause(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        await componentLogService.log(id, "pause");
        return;
      }
      else{
        res.status(204).json({status: "fail", message:result.message});
        return;
      }
    case "stop":
      result = componentService.stop(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        await componentLogService.log(id, "stop");
        return;
      }
      else{
        res.status(204).json({status: "fail", message:result.message});
        return;
      }
    default:
      res.status(400).json({status:"invalid operation"});
      return;
    }
});

module.exports = timerRouter;
