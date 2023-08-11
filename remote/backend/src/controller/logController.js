const express = require("express");
const Global = require('../global');
const logRouter = express.Router();

(async ()=>{
    logService = await Global.getLogService();
})();

logRouter.get('/:user_id/:group_id', async (req, res)=>{
    const user_id = req.params.user_id;
    const group_id = req.params.group_id;
    const hour = req.query.hour;
    const date = req.query.date;
    const month = req.query.month;
    const year = req.query.year;
    console.log({hour, date, month, year});
    if(!!hour && !!date && !month && !year){
        res.json(await logService.hour(user_id, group_id, date, hour));
        return;
    }
    if(!hour && !!date && !month && !year){
        res.json(await logService.date(user_id, group_id, date));
        return;
    }
    if(!hour && !date && !!month && !year){
        res.json(await logService.month(user_id, group_id, month));
        return;
    }
    if(!hour && !date && !month && !!year){
        res.json(await logService.year(user_id, group_id, year));
        return;
    }
    res.status(400).json([]);
});
module.exports = logRouter;