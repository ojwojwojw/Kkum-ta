const Timer = require("./timerComponentService");

class TimerService {
    constructor(timerRepository) {
        this.timerRepository = timerRepository;
        this.array = new Map(); //Object와 비슷하지만 순서를 유지
    }
    async init() {
        const [rows] = await this.timerRepository.getAll();
        rows.forEach((item) => {
            const component = new Timer(
                item.timer_key,
                item.group_key,
                item.init_time,
                item.max_iter
            );
            this.array.set(item.timer_key, component);
        });
    }
    async createTimer(initTimes, maxIter = 1, group_id = 0) {
        const id = await this.timerRepository.insert(
            group_id,
            initTimes,
            maxIter
        );
        const component = new Timer(id, group_id, initTimes, maxIter);
        this.array.set(id, component);
        return id;
    }
    getAll() {
        return [...this.array.values()].map((item) => item.json());
    }
    getByGroup(group_id) {
        return [...this.array.values()]
            .filter((item) => item.group === group_id)
            .map((item) => item.json());
    }
    getById(id) {
        if (!this.array.has(id)) return null;
        return this.array.get(id).json();
    }
    start(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.get(id).start();
        return { ok: true, message: "ok" };
    }
    pause(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.get(id).pause();
        return { ok: true, message: "ok" };
    }
    stop(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.get(id).stop();
        return { ok: true, message: "ok" };
    }
    tag(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.get(id).tag();
        return { ok: true, message: "ok" };
    }
    async deleteById(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.delete(id);
        await this.timerRepository.deleteById(id);
        return { ok: true, message: "ok" };
    }
    async deleteAllByGroupKey(group_id) {
        [...this.array.values()]
            .filter((item) => item.group === group_id)
            .forEach(async (item) => {
                await this.deleteById(item.id);
            });
        return { ok: true, message: "ok" };
    }
    async putInitTime(id, initTime) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        await this.timerRepository.setInitTime(id, initTime);
        await this.array.get(id).setInitTime(initTime);
        return { ok: true, message: "ok" };
    }
}
module.exports = TimerService;
