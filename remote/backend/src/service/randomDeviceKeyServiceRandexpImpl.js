const RandomDeviceKeyService = require("./randomDeviceKeyService");
const Randexp = require("randexp");

class RandomDeviceKeyServiceMD5Impl extends RandomDeviceKeyService{
    constructor(){
        super();
    }
    generate(){
        return new Randexp(/^[0-9A-Za-z]{6}$/).gen();
    }
}
module.exports = RandomDeviceKeyServiceMD5Impl;