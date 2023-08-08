const express = require("express");
const Global = require('../global');
const logRouter = express.Router();

(async ()=>{
    logService = await Global.getLogService();
})();

logRouter.get('/:timer_id', async (req, res)=>{
    const timer_id = req.params.timer_id;
    const hour = req.query.hour;
    const date = req.query.date;
    const month = req.query.month;
    const year = req.query.year;
    console.log({hour, date, month, year});
    if(!!hour && !!date && !month && !year){
        res.json(await logService.hour(timer_id, date, hour));
        return;
    }
    if(!hour && !!date && !month && !year){
        res.json(await logService.date(timer_id, date));
        return;
    }
    if(!hour && !date && !!month && !year){
        res.json(await logService.month(timer_id, month));
        return;
    }
    if(!hour && !date && !month && !!year){
        res.json(await logService.year(timer_id, year));
        return;
    }
    res.status(400).json([]);
});
module.exports = logRouter;