class RandomDeviceKeyService{
    constructor(){
        if(new.target == RandomDeviceKeyService){
            throw Error("RandomDeviceKeyService is an abstract class and cannot create instance of it.");
        }
        if(typeof(this.generate) !== "function"){
            throw Error("You should implement generate to extend AbstractRandomDeviceService");
        }
    }
}

module.exports = RandomDeviceKeyService;