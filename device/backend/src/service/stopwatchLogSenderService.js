const RemoteHost = require('../config/remoteHost');
const axios = require('axios');
class StopwatchLogSenderService{
    constructor(studyHourlyRepository, deviceService){
        this.studyHourlyRepository = studyHourlyRepository;
        this.deviceService = deviceService;
        this.send = async ()=>this.#send();
        this.send();
    }
    async #send(){
        console.log("+trying to send data to remote host...+");
        const endpoint = RemoteHost.endpoint;
        const device_key = await this.deviceService.getDeviceSerial();
        for(let group_id = 0;group_id < 5;group_id++){
            const remote = endpoint + "/log/device/" + device_key + "/" + group_id;
            const [data] = await this.studyHourlyRepository.getAllRows(group_id);
            if(data.length === 0) continue;
            axios.post(remote, data)
            .then((result)=>{
                if(result.status === 200){
                    this.studyHourlyRepository.removeMultiple(data);
                    console.log(`+successfully sent data(group ${group_id})+`);
                }
            })
            .catch((err)=>{
                if(err.response?.status){
                    console.log("+failed to send data: response code=", err.response.status, "+");
                }
                else{
                    console.log("+failed to send data: response=",err, "+");
                }
            }); //Don't care about the result
        }
        setTimeout(this.send, 1 * 60 * 1000);
    }
}
module.exports = StopwatchLogSenderService;