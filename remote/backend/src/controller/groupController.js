const express = require("express");
const Global = require("../global");
const GruopRepository = require("../repository/groupRepository");
const groupRouter = express.Router();

(async () => {
    GruopRepository = await Global.getGroupRepository();
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

    const register = await GruopRepository.insertGroupByUserId(
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

    const update = await GruopRepository.updateNameByUserIdAndGroupKey(
        group_id,
        user_id,
        name
    );

    return res.status(200).json(update);
});

groupRouter.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) return res.status(400).json({ status: "bad request" });

    res.json(await GruopRepository.findByUserId(user_id));
    return;
});
