const RandomDeviceKeyService = require("./randomDeviceKeyService");
const Randexp = require("randexp");

class RandomDeviceKeyServiceImpl extends RandomDeviceKeyService{
    constructor(){
        super();
    }
    generate(){
        return new Randexp(/^[0-9A-Za-z]{8}$/).gen();
    }
}
module.exports = RandomDeviceKeyServiceImpl;