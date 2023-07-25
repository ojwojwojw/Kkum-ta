const express = require('express')
const router = express.Router();
const timer = require('../../../backend/src/repository/timerRepository')

const tim = new timer();
tim.TimerRepository();

router.get('/api', (req, res) => {
    res.send({test: 'hi'});
});

router.get('/timer_table', async (req, res) => {
    const q = await tim.findAll();
    res.send(q[0]);
})

module.exports = router;