const express = require("express");
const Global = require('../global');
const devRouter = express.Router();

(async()=>{
    deviceRepository = await Global.getDeviceRepository();
})();

devRouter.post('/register', async (req, res)=>{
    return res.json({id: await deviceRepository.getNewDeviceSerial()});
});
module.exports = devRouter;