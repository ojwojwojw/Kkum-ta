const express = require("express");
const Global = require("../global");
const compRouter = express.Router();

(async () => {
    componentRepository = await Global.getComponentRepository();
    userRepository = await Global.getUserRepository();
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
 *              description: 잘못된 요청
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "bad request"
 *          404:
 *              description: 해당 키를 가진 타이머가 없음
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
 *              description: 타이머 리스트
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/BasicTimerComponent'
 *          400:
 *              description: 잘못된 요청
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
    
    res.json(await componentRepository.findAllComponentByUserId(user_id));
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
 *          description: 유저 ID
 *        - in: path
 *          name: group_id
 *          schema:
 *              type: integer
 *              example: 1
 *          required: true
 *          description: 그룹 ID(1~4)
 *      responses:
 *          200:
 *              description: 타이머 리스트
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
        return;
    }
    res.status(200).json(await componentRepository.findAllComponentByGroupKeyOfUser(group_key, user_id));
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
 *              description: 삽입 성공
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
 *              description: 잘못된 요청
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
    const insertId = await componentRepository.insertComponent(
        initTiime,
        iter,
        gkey,
        uid
    );

    return res.status(201).json({status: "created", id: insertId});
});
/**
 * @swagger
 * /timer/{component_key}:
 *  post:
 *      summary: "타이머의 initTime을 수정한다."
 *      description: "타이머의 initTime을 수정한다"
 *      tags: [Timer]
 *      parameters:
 *        - in: path
 *          name: component_key
 *          schema:
 *              type: integer
 *          required: true
 *          description: 타이머 id
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
 *          201:
 *              description: 삽입 성공
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
 *              description: 잘못된 요청
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
    const update = await componentRepository.updateInitTime(ckey, initTime);

    return res.status(200).json(update);
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
 *          description: 유저 ID
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

// compRouter.put("/:component_key", async (req, res) => {
//     const ckey = req.params.component_key;
//     const maxIter = req.body.maxIter;

//     if (!ckey || !maxIter) {
//         return res.status(400).json({ status: "bad request" });
//     }
//     const update = await componentRepository.updateMaxIter(ckey, maxIter);

//     return res.status(200).json(update);
// });

compRouter.delete("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;

    if (!ckey) return res.status(400).json({ status: "bad request" });

    const del = await componentRepository.deleteComponent(ckey);

    const success = (del.affectedRows == 1);
    if(success){
        return res.status(200).json({status: "ok"});
    }
    else{
        return res.status(404).json({status: "not found"})
    }
});

module.exports = compRouter;