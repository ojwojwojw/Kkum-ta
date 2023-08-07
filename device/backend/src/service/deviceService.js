const axios = require('axios');
const remoteHost = require('../config/remoteHost');

class DeviceService{
    constructor(deviceRepository){
        this.deviceRepository = deviceRepository;
    }
    async getDeviceSerial(){
        const serial = await this.deviceRepository.getDeviceSerial();
        if(serial !== null) return serial;
        try{
            console.log(remoteHost.endpoint+ "/dev/register");
            const result = await axios.post(remoteHost.endpoint + "/dev/register", {});
            await this.deviceRepository.setDeviceSerial(result.data.id);
            return result.data.id;
        } catch(e){
            return null;
        }
    }
}

module.exports = DeviceService;