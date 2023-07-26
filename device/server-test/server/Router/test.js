const express = require('express')
const router = express.Router();
const timer = require('../../../backend/src/repository/timerRepository')
const timerLog = require('../../../backend/src/repository/timerLogRepository')

const tim = new timer();
const timlog = new timerLog();

router.get('/api', (req, res) => {
    res.send({test: 'hi'});
});

router.get('/timer_table', async (req, res) => {
    const q = await tim.findAll();
    res.send(q[0]);
})

router.get('/timer_table/id', async (req, res) => {
    const q = await tim.findTimerByName(req.query.timer_name);
    res.send(q[0]);
})

router.get('/timer_log', async(req, res) => {
    const q = await timlog.findAll();
    res.send(q[0]);
})

module.exports = router;