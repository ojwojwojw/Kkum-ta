const express = require("express");
const Global = require("../global");
const compRouter = express.Router();

(async () => {
    componentRepository = await Global.getComponentRepository();
})();

compRouter.get("/:component_key", async (req, res) => {
    const component_key = req.params.component_key;

    res.json(
        await componentRepository.findAllByComponentKey(
            component_key
        )
    );
    return;
});

compRouter.get("/user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    
    res.json(await componentRepository.findAllComponentByUserId(user_id));
    return;
});

compRouter.get("/user/:user_id/:group_id", async (req, res) => {
    const group_key = req.params.group_id;
    const user_id = req.params.user_id;

    res.json(
        await componentRepository.findAllComponentByGroupKeyOfUser(
            group_key,
            user_id
        )
    );
    return;
});

compRouter.post("/", async (req, res) => {
    const uid = req.body.user_id;
    const gkey = req.body.group_id;
    const initTiime = req.body.initTime;
    const iter = req.body.maxIter;
    if (!uid || !gkey || !initTiime || !iter) {
        console.log(uid + " " + gkey + " " + initTime + " " + iter);
        return res.status(400).json({ status: "bad request" });
    }
    const register = await componentRepository.insertComponent(
        initTiime,
        iter,
        gkey,
        uid
    );

    return res.status(200).json(register);
});

compRouter.put("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;
    const initTime = req.body.initTime;

    if (!ckey || !initTime) {
        return res.status(400).json({ status: "bad request" });
    }
    const update = await componentRepository.updateInitTime(ckey, initTime);

    return res.status(200).json(update);
});

compRouter.put("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;
    const maxIter = req.body.maxIter;

    if (!ckey || !maxIter) {
        return res.status(400).json({ status: "bad request" });
    }
    const update = await componentRepository.updateMaxIter(ckey, maxIter);

    return res.status(200).json(update);
});

compRouter.delete("/:component_key", async (req, res) => {
    const ckey = req.params.component_key;

    if (!ckey) return res.status(400).json({ status: "bad request" });

    const del = await componentRepository.deleteComponent(ckey);

    return res.status(200).json(del);
});

module.exports = compRouter;