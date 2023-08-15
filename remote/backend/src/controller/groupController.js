const express = require("express");
const Global = require("../global");
const groupRouter = express.Router();

(async () => {
    groupRepository = await Global.getGroupRepository();
})();

/**
 * @swagger
 * /group:
 *  post:
 *      summary: "(1~4)번 그룹을 생성한다.(put 사용 권장)"
 *      description: "유저의 group_id번 그룹의 이름을 설정한다."
 *      tags: [Group]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          group_id:
 *                              type: integer
 *                              example: 1
 *                          user_id:
 *                              type: string
 *                              example: "테스트입니다"
 *                          name:
 *                              type: string
 *                              example: "새 그룹 이름"
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
groupRouter.post("/", async (req, res) => {
    const group_id = req.body.group_id;
    const user_id = req.body.user_id;
    const name = req.body.name;

    if (!group_id || !user_id || !name) {
        return res.status(400).json({ status: "bad request" });
    }
    if (group_id < 1 || group_id > 4) {
        return res.status(400).json({ status: "Not Match for Gruop ID" });
    }

    const register = await groupRepository.insertGroupByUserId(
        group_id,
        user_id,
        name
    );

    // 사용자에 대한 Group ID가 이미 존재할 경우 에러 처리

    return res.status(200).json(register);
});
/**
 * @swagger
 * /group/{user_id}/{group_id}:
 *  put:
 *      summary: "그룹의 이름을 설정한다."
 *      description: "유저의 group_id번 그룹의 이름을 설정한다."
 *      tags: [Group]
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
 *          description: 그룹 번호
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "새 그룹 이름"
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
groupRouter.put("/:user_id/:group_id", async (req, res) => {
    const user_id = req.params.user_id;
    const group_id = req.params.group_id;
    const name = req.body.name;

    if (!user_id || !group_id || !name) {
        return res.status(400).json({ status: "bad request" });
    }

    await groupRepository.updateNameByUserIdAndGroupKey(
        user_id,
        group_id,
        name
    );
    return res.status(200).json({status:"ok", name});
});
/**
 * @swagger
 * /group/{user_id}:
 *  get:
 *      summary: "유저에게 속한 타이머 리스트를 가져온다."
 *      description: "유저에 속한 타이머 리스트를 가져온다."
 *      tags: [Group]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *              type: string
 *          required: true
 *          description: 유저 ID
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  group_key:
 *                                      type: integer
 *                                      example: 0
 *                                  name:
 *                                      type: string
 *                                      example: "그룹 이름"
 *                                  last_update:
 *                                      type: string
 *                                      example: "2023-08-14T08:09:38.000Z"
 *                          example:
 *                              [{"group_key": 0,"name": "기본 그룹","last_update": "2023-08-14T08:09:38.000Z"},{"group_key": 1,"name": "새 그룹 이름","last_update": "2023-08-14T08:09:38.000Z"},{"group_key": 2,"name": "그룹 2","last_update": "2023-08-14T08:09:38.000Z"},{"group_key": 3,"name": "그룹 3","last_update": "2023-08-14T08:09:38.000Z"},{"group_key": 4,"name": "그룹 4","last_update": "2023-08-14T08:09:38.000Z"}]
 *          404:
 *              description: 유저가 존재하지 않음
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
groupRouter.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) return res.status(400).json({ status: "bad request" });
    const result = await groupRepository.findAllByUserId(user_id);
    if(result.length === 0){
        res.status(404).json({status:"not found"});
        return;
    }
    else{
        res.status(200).json(result);
        return;
    }
});
/**
 * @swagger
 * /group/{user_id}/{group_id}:
 *  get:
 *      summary: "그룹에 속한 타이머 리스트를 가져온다."
 *      description: "유저의 group_id번 그룹에 속한 타이머 리스트를 가져온다."
 *      tags: [Group]
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
 *          description: 그룹 번호
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
groupRouter.get("/:user_id/:group_id", async (req, res) => {
    const user_id = req.params.user_id;
    const group_id = req.params.group_id;

    if(!user_id || !group_id) {
        return res.status(400).json({status: "bad request"});
    }

    res.json(await groupRepository.findByUserIdAndGroupId(user_id, group_id));
    return;
})

module.exports = groupRouter;