const express = require("express");
const Global = require("../global");
const devRouter = express.Router();

(async () => {
    deviceService = await Global.getDeviceService();
})();

devRouter.get("/", async (req, res)=>{
    const result = await deviceService.getDeviceSerial();
    if(result === null){
        res.status(500).json({id:null});
        return;
    }
    else {
        res.status(200).json({id:result});
        return;
    }

})

module.exports = devRouter;