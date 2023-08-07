const express = require("express");
const Global = require('../global');
const devRouter = express.Router();

(async()=>{
    deviceService = await Global.getDeviceService();
})();

devRouter.post('/register', async (req, res)=>{
    const {device_key} = await deviceService.insertDevice();
    return res.json({id:device_key});
});
module.exports = devRouter;