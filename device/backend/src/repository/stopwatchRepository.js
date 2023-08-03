const ComponentRepository = require('./componentRepository');

class StopwatchRepository extends ComponentRepository{
    constructor(){
        super();
    }
    async init(){
        super.init();
    }
    async create(init_time, group_key=0){
        super.insert(group_key, "stopwatch", init_time, init_time, 1);
    }

}
module.exports = StopwatchRepository;
