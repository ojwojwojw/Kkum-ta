const express = require("express");
const Global = require("../global");
const stopwatchRouter = express.Router();

(async ()=>{
    groupService = await Global.getGroupService();
    stopwatchLogService = await Global.getStopwatchLogService();
})();

stopwatchRouter.get("/", (req, res)=>{
    res.status(200).json(groupService.getAll());
    return;
})

stopwatchRouter.get("/:group_id", (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${group_id})`});
        return;
    }
    res.status(200).json(groupService.json(group_id));
    return;
});

stopwatchRouter.put("/:group_id", (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    const time = parseInt(req.body.time);
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${group_id})`});
        return;
    }
    if(Object.is(time, NaN) || time < 0){
        res.status(400).json({status:`invalid time(${time})`});
        return;
    }
    groupService.setStopwatchTime(group_id, time);
});

stopwatchRouter.post("/operation/:group_id", (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    const operation = req.body.operation;
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${group_id})`});
        return;
    }
    switch(operation){
        case "start":
            res.status(200).json({status:"ok"});
            groupService.start(group_id);
            stopwatchLogService.insert(group_id, operation);
            return;
        case "pause":
            res.status(200).json({status:"ok"});
            groupService.pause(group_id);
            stopwatchLogService.insert(group_id, operation);
            return;
        case "stop":
            res.status(200).json({status:"ok"});
            groupService.stop(group_id);
            stopwatchLogService.insert(group_id, operation);
            return;
        default:
            res.status(400).json({status:`invalid opeartion(${operation})`});
            return;
    }
});

module.exports = stopwatchRouter;