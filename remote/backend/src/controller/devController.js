const express = require("express");
const Global = require('../global');
const { isLoggedIn } = require("../service/authService");
const devRouter = express.Router();

(async()=>{
    deviceRepository = await Global.getDeviceRepository();
    userRepository = await Global.getUserRepository();
})();

/**
 * @swagger
 * paths:
 *  /dev/register:
 *      post:
 *          summary: 새로운 디바이스 키를 생성한다.
 *          description: 중복이 없는 디바이스 키를 새로 생성해 저장하고, 이를 반환한다.
 *          tags: [Backend/Device]
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
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * 
 * security:
 *  - bearerAuth: []
 */
/**
 * @swagger
 * paths:
 *  /dev/user/{user_id}:
 *      patch:
 *          summary: 사용자에게 디바이스 키를 배치한다.(로그인 필요)
 *          description: 사용자 로그인 ID와 디바이스 키를 연동한다.
 *          tags: [Device]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: user_id
 *                schema:
 *                  type: string
 *                  example: "테스트입니다"
 *                       
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              device_serial:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: "디바이스 키를 사용자에게 등록함"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "ok"
 *              401:
 *                  description: "인증되지 않은 사용자"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "unauthorized"
 *              404:
 *                  description: "디바이스 키 또는 유저 키를 찾을 수 없음"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "not found"
 *  
 */
devRouter.patch('/user/:user_id', isLoggedIn, async (req, res)=>{
    const user_id = req.params.user_id;
    const device_serial = req.body.device_serial;
    console.log("#0", user_id, device_serial);
    if(!user_id || !device_serial){
        res.status(400).json({status: "invalid parameters"});
        return;
    }
    const user_key = (await userRepository.getUserById(user_id)).user_key;
    if(!user_key){
        res.status(404).json({status: "not found"});
        return;
    }

    const result = await userRepository.updateDeviceKey(user_key, device_serial);
    if(result){
        res.status(200).json({status:"ok"});
        return;
    }
    else{
        res.status(404).json({status: "not found"});
        return;
    }
});
/**
 * @swagger
 * paths:
 *  /dev/user/{user_id}:
 *      get:
 *          summary: 사용자에게 할당된 디바이스 키를 조회한다.(로그인 필요)
 *          description: 사용자에게 할당된 디바이스 키를 조회한다.
 *          tags: [Device]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: user_id
 *                schema:
 *                  type: string
 *                  example: "테스트입니다"
 *          responses:
 *              200:
 *                  description: "디바이스 키"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  device:
 *                                      type: string
 *                                      example: "device_key"
 *              401:
 *                  description: "인증되지 않은 사용자"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "unauthorized"
 *              404:
 *                  description: "디바이스 키 또는 유저 키를 찾을 수 없음"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "not found"
 *  
 */
devRouter.get('/user/:user_id', isLoggedIn, async (req, res)=>{
    const user_id = req.params.user_id;
    const user = await userRepository.getUserById(user_id);
    if(!user){
        res.status(404).json({status: "not found"});
        return;
    }
    const device_key = user.device_key;
    const device_serial = await deviceRepository.getDeviceSerialById(device_key);
    if(!device_serial){
        res.status(404).json({status: "not found"});
        return;
    }
    return res.status(200).json({device_serial});
});
module.exports = devRouter;