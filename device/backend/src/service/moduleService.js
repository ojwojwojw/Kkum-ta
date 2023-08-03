const TimerService = require("./timerService");
const StopwatchService = require("./stopwatchService");
class ModuleService {
    constructor(componentRepository, timerRepository, stopwatchRepository) {
        this.componentRepository = componentRepository;
        this.timerRepository = timerRepository;
        this.stopwatchRepository = stopwatchRepository;
        this.array = new Map(); //Object와 비슷하지만 순서를 유지
    }
    async init() {
        const [rows] = await this.componentRepository.getAll();
        rows.forEach((item) => {
            item.init_time = JSON.parse(item.init_time);
            let service;
            switch (item.component_type) {
                case "stopwatch":
                    service = new StopwatchService(item.init_time);
                    service.id = item.component_key;
                    this.array.set(item.component_key, service);
                    break;
                case "timer":
                    service = new TimerService(item.init_time, item.max_iter);
                    service.id = item.component_key;
                    this.array.set(item.component_key, service);
                    break;
                default:
                    throw `Unexpected type found in DB: ${item.component_type}`;
            }
        });
    }
    async createTimer(initTimes, maxIter) {
        if (maxIter === undefined) maxIter = 1;
        const promise = this.timerRepository.create(initTimes, maxIter);
        const timerService = new TimerService(initTimes, maxIter);
        timerService.id = await promise;
        this.array.set(timerService.id, timerService);
        return timerService.id;
    }
    async createStopwatch(initTime) {
        const promise = this.stopwatchRepository.create(initTime);
        const stopwatchService = new StopwatchService(initTime);
        stopwatchService.id = await promise;
        this.array.set(stopwatchService.id, stopwatchService);
        return stopwatchService.id;
    }
    getAll() {
        return [...this.array.values()].map((item) => item.json());
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
    deleteById(id) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        this.array.delete(id);
        return { ok: true, message: "ok" };
    }
    async putInitTime(id, initTime) {
        if (!this.array.has(id))
            return { ok: false, message: `Cannot find item with id=${id}` };
        await this.componentRepository.setInitTime(id, initTime);
        await this.array.get(id).setInitTime(initTime);
        return { ok: true, message: "ok" };
    }
}
module.exports = ModuleService;
