class TimerComponentService{
    constructor(id, group, initTime, maxIter){
        //initTime: array of Integers
        this.id = id;
        this.group = group;
        this.initTime = typeof(initTime)==="string"?JSON.parse(initTime) : initTime;
        this.initTimeIndex = 0;
        this.isRunning = false;
        this.curIter = 0;
        this.curTimerTime = 0;
        this.maxIter = maxIter;
        this.lastLogTime = Date.now();
    }

    start(){
        this.update();
        this.isRunning = true;
    }
    pause(){
        this.update();
        this.isRunning = false;
    }
    update(){
        const now = Date.now();
        const ellapsedMilliseconds = now - this.lastLogTime;
        this.lastLogTime = now;
        if(!this.isRunning) return;
        this.curTimerTime += ellapsedMilliseconds;
        while(this.curTimerTime >= this.initTime[this.initTimeIndex]){
            this.curTimerTime -= this.initTime[this.initTimeIndex];
            this.initTimeIndex++;
            if(this.initTimeIndex >= this.initTime.length){
                this.initTimeIndex = 0;
                this.curIter++;
            }
            if(this.curIter >= this.maxIter){
                this.initTimeIndex = this.initTime.length - 1;
                this.curTimerTime = this.initTime[this.initTimeIndex];
                this.curIter = this.maxIter;
                this.isRunning = false;
                break;
            }
        }
    }
    stop(){
        this.isRunning = false;
        this.initTimeIndex = 0;
        this.curTimerTime = 0;
        this.curIter = 0;
        this.lastLogTime = Date.now();
    }
    tag(){
        this.isRunning = true;
        this.initTimeIndex++;
        if(this.initTimeIndex >= this.initTime.length){
            this.initTimeIndex = 0;
            this.curIter++;
        }
        if(this.curIter >= this.maxIter){
            this.reset();
            return {next:null};
        }
        this.curTimerTime = 0;
        this.lastLogTime = Date.now();
        return {next:{initTime:this.initTime[this.initTimeIndex], isRunning:true}};
    }

    json(){
        this.update();
        return {
            id: this.id,
            type: "timer",
            initTime: this.initTime,
            initTimeIndex: this.initTimeIndex,
            remainTime: this.initTime[this.initTimeIndex] - this.curTimerTime,
            isRunning: this.isRunning,
            curIter: this.curIter,
            maxIter: this.maxIter
        }
    }
    setInitTime(initTime){
        if(!initTime.length){
            return false;
        }
        this.initTime = initTime;
        this.initTimeIndex = 0;
        this.isRunning = false;
        this.curIter = 0;
        this.curTimerTime = 0;
        this.lastLogTime = Date.now();
        return true;
    }
    get progress(){
        return this.curTimerTime / this.initTime[this.initTimeIndex];
    }
}

module.exports = TimerComponentService;