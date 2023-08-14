const express = require("express");
const Global = require("../global");
const groupRouter = express.Router();

(async () => {
    gruopRepository = await Global.getGroupRepository();
})();

groupRouter.post("/", async (req, res) => {
    const group_id = req.body.gruop_id;
    const user_id = req.body.user_id;
    const name = req.body.name;

    if (!group_id || !user_id || !name) {
        return res.status(400).json({ status: "bad request" });
    }
    if (group_id < 1 || group_id > 4) {
        return res.status(400).json({ status: "Not Match for Gruop ID" });
    }

    const register = await gruopRepository.insertGroupByUserId(
        group_id,
        user_id,
        name
    );

    // 사용자에 대한 Group ID가 이미 존재할 경우 에러 처리

    return res.status(200).json(register);
});

groupRouter.put("/:user_id/:group_id", async (req, res) => {
    const user_id = req.params.user_id;
    const group_id = req.params.group_id;
    const name = req.body.name;

    if (!user_id || !group_id || !name) {
        return res.status(400).json({ status: "bad request" });
    }

    const update = await gruopRepository.updateNameByUserIdAndGroupKey(
        user_id,
        group_id,
        name
    );

    return res.status(200).json(update);
});

groupRouter.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) return res.status(400).json({ status: "bad request" });

    res.json(await gruopRepository.findAllByUserId(user_id));
    return;
});

groupRouter.get("/:user_id/:group_id", async (req, res) => {
    const user_id = req.params.user_id;
    const group_id = req.params.group_id;

    if(!user_id || !group_id) {
        return res.status(400).json({status: "bad request"});
    }

    res.json(await gruopRepository.findByUserIdAndGroupId(user_id, group_id));
    return;
})

module.exports = groupRouter;