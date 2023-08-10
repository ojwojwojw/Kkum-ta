const express = require("express");
const Global = require("../global");
const timerRouter = express.Router();


let timerService;
(async()=>{
  timerService = await Global.getTimerService();
})();
/**
 * @swagger
 * /timer:
 *  get:
 *      summary: 타이머 목록을 가져온다.
 *      description: 타이머 목록 전체 또는 특정 그룹에 속한 타이머 목록 전체를 가져온다.
 *      tags: [Timer]
 *      parameters:
 *          - in: query
 *            name: group_id
 *            schema:
 *              type: integer
 *            examples:
 *              empty:
 *                value: ""
 *              0:
 *                value: 0
 *              1:
 *                value: 1
 *            required: false
 *            description: 그룹 이름(0~4)
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                                id:
 *                                    type: number
 *                                    example: 123
 *                                type:
 *                                    type: string
 *                                    example: timer
 *                                initTime:
 *                                    type: array
 *                                    items:
 *                                      type: number
 *                                      example: 0
 *                                initTimeIndex:
 *                                    type: number
 *                                    example: 0
 *                                remainTime:
 *                                    type: number
 *                                    example: 420000
 *                                isRunning:
 *                                    type: boolean
 *                                    example: false
 *                                curIter:
 *                                    type: number
 *                                    example: 0
 *                                maxIter:
 *                                    type: number
 *                                    example: 1
 *          400:
 *              description: 잘못된 파라미터
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "invalid group_id(6)"
 */
timerRouter.get("/", async (req, res) => {
  if(req.query.group_id !== undefined && Object.is(parseInt(req.query.group_id), NaN)){
    return res.status(400).json({status:`invalid parameter: group_id(${req.query.group_id}`});
  }
  const group_id = parseInt(req.query.group_id);
  if(group_id){
    res.status(200).json(timerService.getByGroup(parseInt(group_id)));
    return;
  }
  else{
    res.status(200).json(timerService.getAll());
    return;
  }
});
/**
 * @swagger
 * /timer/{timer_id}:
 *  get:
 *      summary: 타이머 id에서 타이머 정보를 가져온다.
 *      description: 타이머 하나의 정보를 가져온다.
 *      tags: [Timer]
 *      parameters:
 *          - in: path
 *            name: timer_id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 타이머 ID
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
*                            type: object
*                            properties:
*                                id:
*                                    type: number
*                                    example: 123
*                                type:
*                                    type: string
*                                    example: timer
*                                initTime:
*                                    type: array
*                                    items:
*                                      type: number
*                                      example: 0
*                                initTimeIndex:
*                                    type: number
*                                    example: 0
*                                remainTime:
*                                    type: number
*                                    example: 420000
*                                isRunning:
*                                    type: boolean
*                                    example: false
*                                curIter:
*                                    type: number
*                                    example: 0
*                                maxIter:
*                                    type: number
*                                    example: 1
 *          400:
 *              description: 잘못된 파라미터
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "invalid group_id(6)"
 *          404:
 *              description: 해당 ID를 찾을 수 없음
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                          type: string
 *                          example: "not found"
 */
timerRouter.get("/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:`invalid parameter id(${id})`});
  }
  const id = parseInt(req.params.id);
  const item = timerService.getById(id);
  if(item === null){
    res.status(404).json({status:"not found"});
    return;
  }
  else{
    res.status(200).json(item);
    return;
  }
});
/**
 * @swagger
 * /timer/{timer_id}:
 *   delete:
 *     summary: 타이머를 삭제한다.
 *     description: 타이머의 ID를 받아 이와 관련한 타이머를 삭제한다.
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: timer_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 타이머 ID
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "invalid id(hello)"
 *       404:
 *         description: 해당 ID를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "not found"
 */
timerRouter.delete("/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:`invalid id(${req.params.id})`});
  }
  const id = parseInt(req.params.id);
  const result = await timerService.deleteById(id);
  if(result.ok){
    res.status(200).json({ status: "ok" });
    return;
  } else{
    res.status(404).json({status:"not found"});
    return;
  }
});
/**
 * @swagger
 * /timer/{timer_id}:
 *   put:
 *     summary: 타이머 시간을 수정한다.
 *     description: 타이머의 ID를 받아 이와 관련한 타이머의 초기시간을 수정한다.
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: timer_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 타이머 ID
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              initTime:
 *                type: array
 *                items:
 *                  type: number
 *                example: [220000, 0]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "invalid id(hello)"
 *       404:
 *         description: 해당 ID를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "not found"
 */
timerRouter.put("/:id", async (req, res)=>{
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:"invalid parameter"});
  }
  const id = parseInt(req.params.id);
  const initTime = req.body.initTime;
  const result = await timerService.putInitTime(id, initTime);
  if(result.ok){
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
 * /timer:
 *   post:
 *     summary: 타이머를 생성한다.
 *     description: 타이머를 생성한다.
 *     tags: [Timer]
 *     parameters:
 *       - in: query
 *         name: group_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: 타이머가 속할 그룹 번호(0~4)
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                initTime:
 *                  type: array
 *                  items:
 *                    type: number
 *                  example: [220000, 0]
 *                maxIter:
 *                  type: integer
 *                  example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "invalid id(hello)"
 *       404:
 *         description: 해당 ID를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "not found"
 */
timerRouter.post("/", async (req, res) => {
  const group_id = req.query.group_id;
  const initTime = req.body.initTime;
  const maxIter = req.body.maxIter;
  const id = await timerService.createTimer(initTime, maxIter, parseInt(group_id));
  res.status(200).json({ status: "ok", id: id });
});
/**
 * @swagger
 * /timer/operation/{timer_id}:
 *   post:
 *     summary: 타이머에 동작 명령을 내린다.
 *     description: 타이머 시작/일시정지/정지(초기화)/태그(다음 타이머로 이동) 명령을 내린다.
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: timer_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: 타이머 ID
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                operation:
 *                  type: string
 *                  example: "start"
 *            examples:
 *              start:
 *                value:
 *                  operation: "start"
 *              pause:
 *                value:
 *                  operation: "pause"
 *              stop:
 *                value:
 *                  operation: "stop"
 *              tag:
 *                value:
 *                  operation: "tag"
 *              invalid(it won't work!):
 *                value:
 *                  operation: "invalid"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "invalid id(hello)"
  *       404:
 *         description: 해당 ID를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "not found"
 */
timerRouter.post("/operation/:id", async (req, res) => {
  if(Object.is(parseInt(req.params.id), NaN)){
    return res.status(400).json({status:`invalid id(${req.params.id})`});
  }
  const id = parseInt(req.params.id);
  const operation = req.body.operation;
  if(operation === "tag"){
    const { next } = timerService.tag(id);
    res.json({ status: "ok", next });
    return;
  }
  let result;
  if(timerService.getById(id) === null){
    res.status(404).json({status: "not found"});
    return;
  }
  switch (operation) {
    case "start":
      result = timerService.start(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        return;
      }
      else{
        res.status(204).json({ status: result.message});
        return;
      }
    case "pause":
      result = timerService.pause(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        return;
      }
      else{
        res.status(204).json({ status: result.message});
        return;
      }
    case "stop":
      result = timerService.stop(id);
      if(result.ok){
        res.status(200).json({ status: "ok" });
        return;
      }
      else{
        res.status(204).json({ status: result.message});
        return;
      }
    default:
      res.status(400).json({status:`invalid operation(${operation})`});
      return;
    }
});

module.exports = timerRouter;
