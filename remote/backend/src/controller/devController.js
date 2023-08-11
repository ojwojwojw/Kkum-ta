const express = require("express");
const Global = require('../global');
const devRouter = express.Router();

(async()=>{
    deviceRepository = await Global.getDeviceRepository();
})();

/**
 * @swagger
 * paths:
 *  /dev/register:
 *      post:
 *          summary: 새로운 디바이스 키를 생성한다.
 *          description: 중복이 없는 디바이스 키를 새로 생성해 저장하고, 이를 반환한다.
 *          tags: [Device]
 *          responses:
 *              "200":
 *                  description: "새로운 디바이스 키(8자리, A-Z, a-z, 0-9로 구성됨)"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                      example: "4Te2xGQ3"
 */

devRouter.post('/register', async (req, res)=>{
    return res.status(200).json({id: await deviceRepository.getNewDeviceSerial()});
});
module.exports = devRouter;