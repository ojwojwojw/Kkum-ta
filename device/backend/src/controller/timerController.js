const express = require("express");
const Global = require("../global");
const timerRouter = express.Router();


let timerService;
(async()=>{
  timerService = await Global.getTimerService();
})();

timerRouter.get("/", async (req, res) => {
  if(Object.is(parseInt(req.query.group_id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const group_id = parseInt(req.query.group_id);
  if(group_id){
    res.status(200).json(timerService.getByGroup(parseInt(group_id)));
    return;
  }
  else{
    res.status(200).json(timerService.getAll());
    return;
  }
});

timerRouter.get("/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const id = parseInt(req.params.id);
  const item = timerService.getById(id);
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
  const result = await timerService.deleteById(id);
  if(result.ok){
    res.status(200).json({ status: "ok" });
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
  const result = await timerService.putInitTime(id, initTime);
  if(result.ok){
    res.status(200).json({status:"ok"});
    return;
  }
  else{
    res.status(404).json({status: "not found"});
    return;
  }
});

timerRouter.post("/", async (req, res) => {
  const group_id = req.query.group_id;
  const initTime = req.body.initTime;
  const maxIter = req.body.maxIter;
  const id = await timerService.createTimer(initTime, maxIter, parseInt(group_id));
  res.status(200).json({ status: "ok", id: id });
});

timerRouter.post("/operation/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:`invalid parameter id(${req.params.id})`});
  }
  const id = parseInt(req.params.id);
  const operation = req.body.operation;
  if(operation === "tag"){
    const { next } = timerService.tag(id);
    res.json({ status: "ok", next });
    return;
  }
  let result;
  switch (operation) {
    case "start":
      result = timerService.start(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        return;
      }
      else{
        res.status(204).json({status: "fail", message:result.message});
        return;
      }
    case "pause":
      result = timerService.pause(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        return;
      }
      else{
        res.status(204).json({status: "fail", message:result.message});
        return;
      }
    case "stop":
      result = timerService.stop(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
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
