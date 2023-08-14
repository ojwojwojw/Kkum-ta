const express = require("express");
const Global = require("../global");
const stopwatchRouter = express.Router();

(async ()=>{
    groupService = await Global.getGroupService();
    stopwatchLogService = await Global.getStopwatchLogService();
    stopwatchLogSenderService = await Global.getStopwatchLogSenderService();
})();
/**
 * @swagger
 * /stopwatch:
 *  get:
 *      summary: 그룹별 스톱워치 목록을 배열 형태로 가져온다.
 *      description: 시간, 실행 여부를 포함한 스톱워치 목록을 가져온다.
 *      tags: [Stopwatch]
 *      responses:
 *          200:
 *              description: 스톱워치 데이터 배열
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  time:
 *                                      type: number
 *                                      example: 50000
 *                                  isRunning:
 *                                      type: boolean
 *                                      example: true
 *                      examples:
 *                          초기 상태:
 *                              value:
 *                                  - time: 0
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 *                          중간 예시:
 *                              value:
 *                                  - time: 50000
 *                                    isRunning: true
 *                                  - time: 12345
 *                                    isRunning: false
 *                                  - time: 600000
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 *                                  - time: 0
 *                                    isRunning: false
 */
stopwatchRouter.get("/", (req, res)=>{
    res.status(200).json(groupService.getAll());
    return;
})
/**
 * @swagger
 * /stopwatch/{group_id}:
 *  get:
 *      summary: 그룹별 스톱워치를 가져온다.
 *      description: 시간, 실행 여부를 포함한 스톱워치를 가져온다.
 *      tags: [Stopwatch]
 *      parameters:
 *          - in: path
 *            name: group_id
 *            schema:
 *              type: string
 *              example: "0"
 *            required: true
 *            description: 그룹 이름(0~4)
 *      responses:
 *          200:
 *              description: 스톱워치 데이터
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              time:
 *                                  type: number
 *                                  example: 50000
 *                              isRunning:
 *                                  type: boolean
 *                                  example: true
 *          400:
 *              description: 잘못된 스톱워치 그룹 id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "invalid group_id(6)"
 */
stopwatchRouter.get("/:group_id", (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${req.params.group_id})`});
        return;
    }
    res.status(200).json(groupService.json(group_id));
    return;
});
/**
 * @swagger
 * /stopwatch/{group_id}:
 *  put:
 *      summary: 스톱워치의 시간을 바꾼다.
 *      description: "스톱워치 실행 시간을 원하는 시간(단위: ms)으로 바꾼다."
 *      tags: [Stopwatch]
 *      parameters:
 *          - in: path
 *            name: group_id
 *            schema:
 *              type: string
 *              example: "0"
 *            required: true
 *            description: 그룹 이름(0~4)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          time:
 *                              type: number
 *                              example: 0
 *      responses:
 *          200:
 *              description: 시간 변경 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "ok"
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
stopwatchRouter.put("/:group_id", (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    const time = parseInt(req.body.time);
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${group_id})`});
        return;
    }
    if(Object.is(time, NaN) || time < 0){
        res.status(400).json({status:`invalid time(${time})`});
        return;
    }
    res.status(200).json({status:"ok"});
    groupService.setStopwatchTime(group_id, time);
});
/**
 * @swagger
 * /stopwatch/operation/{group_id}:
 *  post:
 *      summary: 스톱워치에 동작 명령을 내린다.
 *      description: "스톱워치 시작/일시정지/정지(초기화) 명령을 내린다"
 *      tags: [Stopwatch]
 *      parameters:
 *          - in: path
 *            name: group_id
 *            schema:
 *              type: string
 *              example: "0"
 *            required: true
 *            description: 그룹 이름(0~4)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          operation:
 *                              type: string
 *                              example: "start"
 *                  examples:
 *                      start:
 *                          value:
 *                              operation: "start"
 *                      pause:
 *                          value:
 *                              operation: "pause"
 *                      stop:
 *                          value:
 *                              operation: "stop"
 *                      invalid(it won't work!):
 *                          value:
 *                              operation: "invalid"
 *                      no operation:
 *                          value:
 *                              hello: "yes"
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
stopwatchRouter.post("/operation/:group_id", async (req, res)=>{
    const group_id = parseInt(req.params.group_id);
    const operation = req.body.operation;
    if(Object.is(group_id, NaN) || group_id < 0 || group_id > 5){
        res.status(400).json({status:`invalid group_id(${group_id})`});
        return;
    }
    switch(operation){
        case "start":
            res.status(200).json({status:"ok"});
            await groupService.start(group_id);
            return;
        case "pause":
            res.status(200).json({status:"ok"});
            await groupService.pause(group_id);
            return;
        case "stop":
            res.status(200).json({status:"ok"});
            await groupService.stop(group_id);
            return;
        default:
            res.status(400).json({status:`invalid opeartion(${operation})`});
            return;
    }
});

module.exports = stopwatchRouter;