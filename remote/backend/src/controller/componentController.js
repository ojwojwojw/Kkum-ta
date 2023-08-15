const express = require("express");
const Global = require("../global");
const compRouter = express.Router();

(async () => {
    componentRepository = await Global.getComponentRepository();
    userRepository = await Global.getUserRepository();
    groupRepository = await Global.getGroupRepository();
})();
/**
 * @swagger
 * components:
 *  schemas:
 *      BasicTimerComponent:
 *          type: object
 *          properties:
 *              component_key:
 *                  type: string
 *                  example: 8
 *              init_time:
 *                  type: integer
 *                  example: 68000
 *              maxIter:
 *                  type: integer
 *                  example: 1
 *              user_key:
 *                  type: integer
 *                  example: 1
 *      
 */
/**
 * @swagger
 * /timer/{component_key}:
 *  get:
 *      summary: "타이머 정보 하나를 조회한다"
 *      description: "ID가 component_key인 타이머 정보를 가져온다"
 *      tags: [Timer]
 *      parameters:
 *        - in: path
 *          name: component_key
 *          schema:
 *              type: integer
 *          required: true
 *          description: 타이머 ID
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BasicTimerComponent'
 *          400:
 *              description: "잘못된 요청"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "bad request"
 *          404:
 *              description: "해당 키를 가진 타이머가 없음"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "not found"
 */
compRouter.get("/:component_key", async (req, res) => {
    const component_key = req.params.component_key;
    const result = await componentRepository.findAllByComponentKey(
        component_key
    );
    if(result.length === 0){
        res.status(404).json({status:"not found"});
    }
    else{
        res.status(200).json(result[0]);
    }
    return;
});
/**
 * @swagger
 * /timer/user/{user_id}:
 *  get:
 *      summary: "유저에게 속한 타이머 리스트를 가져온다."
 *      description: "유저에게 속한 모든 타이머 리스트를 가져온다."
 *      tags: [Timer]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *              type: string
 *          required: true
 *          description: 유저 ID
 *      responses:
 *          200:
 *              description: "타이머 리스트"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/BasicTimerComponent'
 *          400:
 *              description: "잘못된 요청"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "bad request"
 *  
 */
compRouter.get("/user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const user = await userRepository.getUserById(user_id);
    if(user === null){
        res.status(404).json({status:`cannot find user named ${user_id}`});
        return;
    }
    const user_key = user.user_key;
    res.status(200).json(await componentRepository.findAllComponentByUserKey(user_key));
    return;
});
/**
 * @swagger
 * /timer/user/{user_id}/{group_id}:
 *  get:
 *      summary: "유저와 그룹 아이디로 타이머 리스트를 조회한다."
 *      description: "유저와 그룹 아이디로 타이머 리스트를 조회한다."
 *      tags: [Timer]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *              type: string
 *          required: true
 *          description: "유저 ID"
 *        - in: path
 *          name: group_id
 *          schema:
 *              type: integer
 *              example: 1
 *          required: true
 *          description: "그룹 ID(1~4)"
 *      responses:
 *          200:
 *              description: "타이머 리스트"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/BasicTimerComponent'
 *  
 */
compRouter.get("/user/:user_id/:group_id", async (req, res) => {
    const group_key = parseInt(req.params.group_id);
    const user_id = req.params.user_id;
    const user = await userRepository.getUserById(user_id);
    if(user === null){
        res.status(404).json({status:`cannot find user named ${user_id}`});
        return;
    }
    const user_key = user.user_key;
    if(isNaN(group_key) || group_key < 1 || group_key > 4){
        res.status(400).json({status: `invalid group_key(${group_key})`});
    }
    res.status(200).json(await componentRepository.findAllComponentByUserKeyAndGroup(user_key, group_key));
    return;
});
/**
 * @swagger
 * /timer:
 *  post:
 *      summary: "타이머를 새로 생성한다."
 *      description: "새로운 타이머를 생성한다"
 *      tags: [Timer]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: string
 *                          group_id:
 *                              type: integer
 *                              example: 1
 *                          initTime:
 *                              type: integer
 *                              example: 68000
 *                          maxIter:
 *                              type: integer
 *                              example: 1
 *      responses:
 *          201:
 *              description: "삽입 성공"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "created"
 *                              id:
 *                                  type: integer
 *                                  example: 0
 *          400:
 *              description: "잘못된 요청"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "bad request"
 *  
 */
compRouter.post("/", async (req, res) => {
    const uid = req.body.user_id;
    const gkey = req.body.group_id;
    const initTiime = req.body.initTime;
    const iter = req.body.maxIter;
    if (!uid || !gkey || !initTiime || !iter) {
        return res.status(400).json({ status: "bad request" });
    }
    if(isNaN(parseInt(gkey)) || parseInt(gkey) < 1 || parseInt(gkey) > 4){
        res.status(400).json({status: `invalid group_id(${req.body.group_id}), it should be between 1 and 4.`});
        return;
    }
    const ukey = (await userRepository.getUserById(uid)).user_key;
    const insertId = await componentRepository.insertComponent(
        initTiime,
        iter,
        gkey,
        ukey
    );
    if(insertId){
        await groupRepository.updateLastUpdate(ukey, gkey);
        return res.status(201).json({status: "created", id: insertId});
    }
    else{
        return res.status(403).json({status: `cannot find user ${uid}`});
    }
});
/**
 * @swagger
 * /timer/{component_key}:
 *  put:
 *      summary: "타이머의 initTime을 수정한다."
 *      description: "타이머의 initTime을 수정한다"
 *      tags: [Timer]
 *      parameters:
 *        - in: path
 *          name: component_key
 *          schema:
 *              type: integer
 *          required: true
 *          description: "타이머 id"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          initTime:
 *                              type: integer
 *                              example: 68000
 *      responses:
 *          200:
 *              description: "성공"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "ok"
 *          400:
 *              description: "잘못된 요청"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "bad request"
 *  
 */
compRouter.put("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;
    const initTime = req.body.initTime;
    if (!ckey || !initTime) {
        return res.status(400).json({ status: "bad request" });
    }
    await componentRepository.updateInitTime(ckey, initTime);
    const component = await componentRepository.findByComponentKey(ckey);
    if(component.length === 0){
        return res.status(404).json({status: "Not found"});
    }
    await groupRepository.updateLastUpdate(component[0].user_key, component[0].group_key);
    return res.status(200).json({status:"ok"});
});
/**
 * @swagger
 * /timer/{component_key}:
 *  delete:
 *      summary: "타이머를 삭제한다."
 *      description: "component_key라는 아이디를 가진 타이머를 삭제한다"
 *      tags: [Timer]
  *      parameters:
 *        - in: path
 *          name: component_key
 *          schema:
 *              type: integer
 *          required: true
 *          description: "타이머 ID"
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "ok"
 *          400:
 *              description: "잘못된 component_key"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "not found"
 *          404:
 *              description: "타이머를 찾을 수 없음"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "not found"
 *  
 */
compRouter.delete("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;

    if (!ckey) return res.status(400).json({ status: "bad request" });
    const component = await componentRepository.findByComponentKey(ckey);
    if(component.length === 0){
        return res.status(404).json({status: "Not found"});
    }

    const [del] = await componentRepository.deleteComponent(ckey);
    const success = (del.affectedRows == 1);
    if(success){
        await groupRepository.updateLastUpdate(component[0].user_key, component[0].group_key);
        return res.status(200).json({status: "ok"});
    }
    else{
        return res.status(404).json({status: "not found"})
    }
});

/**
 * @swagger
 * /timer/device/{device_serial}:
 *  get:
 *      summary: "디바이스에 속한 타이머 리스트를 가져온다."
 *      description: "디바이스에 속한 모든 타이머 리스트를 가져온다."
 *      tags: [Backend/Timer]
 *      parameters:
 *        - in: path
 *          name: device_serial
 *          schema:
 *              type: string
 *          required: true
 *          description: "디바이스 시리얼 키"
 *      responses:
 *          200:
 *              description: "타이머 리스트"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  component_key:
 *                                      type: integer
 *                                      example: 0
 *                                  init_time:
 *                                      type: integer
 *                                      example: 68000
 *                                  maxIter:
 *                                      type: integer
 *                                      example: 1
 *                                  group_key:
 *                                      type: integer
 *                                      example: 1
 *          404:
 *              description: "디바이스 키에 해당하는 유저가 없음"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "cannot find user that uses the device serial(A3ZtN32h)"
 *  
 */
compRouter.get("/device/:device_serial", async (req, res) => {
    const device_serial = req.params.device_serial;
    const user_id = (await userRepository.getUserByDeviceSerial(device_serial)).user_key;
    if(user_id === null){
        res.status(404).json({status:`cannot find user that uses the device serial(${device_serial})`});
    }
    else{
        res.status(200).json(await componentRepository.findAllComponentByUserKey(user_id));
    }
    return;
});
/**
 * @swagger
 * /timer/device/{device_serial}/{group_id}:
 *  get:
 *      summary: "유저와 그룹 아이디로 타이머 리스트를 조회한다."
 *      description: "유저와 그룹 아이디로 타이머 리스트를 조회한다."
 *      tags: [Backend/Timer]
 *      parameters:
 *        - in: path
 *          name: device_serial
 *          schema:
 *              type: string
 *          required: true
 *          description: "디바이스 시리얼키"
 *        - in: path
 *          name: group_id
 *          schema:
 *              type: integer
 *              example: 1
 *          required: true
 *          description: 그룹 ID(1~4)
 *        - in: query
 *          name: last_modified
 *          schema:
 *              type: string
 *              example: "2012-03-04 12:34:56"
 *          required: false
 *          description: "디바이스에서 가지고 있는 정보가 서버에서 만들어진 시간(YYYY-MM-DD hh:mm:ss)"
 *      responses:
 *          200:
 *              description: 타이머 리스트
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  component_key:
 *                                      type: integer
 *                                      example: 1
 *                                  init_time:
 *                                      type: integer
 *                                      example: 68000
 *                                  max_iter:
 *                                      type: integer
 *                                      example: 1
 *                                  group_key:
 *                                      type: integer
 *                                      example: 1
 *                              
 *          304:
 *              description: "수정된 정보가 없다, 304가 보고 싶지 않다면 last_modified를 넣지 말것"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "not modified"
 *  
 */
compRouter.get("/device/:device_serial/:group_id", async (req, res) => {
    const group_key = parseInt(req.params.group_id);
    const device_serial = req.params.device_serial;
    const user_key = (await userRepository.getUserByDeviceSerial(device_serial)).user_key;
    const last_modified = req.query.last_modified;
    if(user_key === null){
        res.status(404).json({status:`cannot find user that uses the device serial(${device_serial})`});
        return;
    }
    else if(isNaN(group_key) || group_key < 1 || group_key > 4){
        res.status(400).json({status:`invalid group_key(${req.params.group_id})`});
        return;
    }
    else if(last_modified){
        if(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(last_modified)){
            if(new Date(last_modified) >= new Date(await groupRepository.getLastModified(user_key, group_key))){
                res.status(304).json({status: "Not modified"});
                return;
            }
            else{
                res.status(200).json(
                    await componentRepository.findAllComponentByUserKeyAndGroup(
                        user_key,
                        group_key
                    )
                );
            }
        }
        else{
            res.status(400).json({status:`invalid last_modified(${last_modified}), it should be in format of YYYY-MM-DD hh:mm:ss`});
            return;
        }
    }
    else{
        res.status(200).json(
            await componentRepository.findAllComponentByUserKeyAndGroup(
                user_key,
                group_key
            )
        );
        return;
    }
});
module.exports = compRouter;