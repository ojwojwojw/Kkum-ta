const express = require("express");
const Global = require("../global");
const devRouter = express.Router();

(async () => {
    deviceService = await Global.getDeviceService();
})();
/**
 * @swagger
 * paths:
 *  /dev:
 *      get:
 *          summary: "디바이스 번호를 가져온다."
 *          description: "디바이스에 디바이스 시리얼 번호가 있다면 그 값을 반환하고, 그렇지 않다면 원격 서버에 요청"
 *          tags: [Device]
 *          responses:
 *              "200":
 *                  description: "정상적으로 디바이스 시리얼 번호를 반환"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                      example: "a3Z5t762"
 *              "503":
 *                  description: "디바이스 내부, 전역 서버 모두에서 디바이스 번호를 얻지 못함"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: null
 *                                      example: null
 *
 */
devRouter.get("/", async (req, res)=>{
    const result = await deviceService.getDeviceSerial();
    if(result === null){
        res.status(503).json({id:null});
        return;
    }
    else {
        res.status(200).json({id:result});
        return;
    }

})

module.exports = devRouter;