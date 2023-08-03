const ComponentRepository = require('./componentRepository');

class TimerRepository extends ComponentRepository{
    constructor(){
        super();
    }
    async init(){
        super.init();
    }
    async create(init_time, max_iter, group_key=0){
        return super.insert(group_key, "timer", init_time, 0, max_iter);
    }
}

module.exports = TimerRepository;
