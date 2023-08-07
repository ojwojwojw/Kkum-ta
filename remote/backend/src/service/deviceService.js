class DeviceService{
    constructor(loginRepository){
        this.loginRepository = loginRepository;
    }
    async insertDevice(){
        const id = await this.loginRepository.insertDevice();
        const device_key = await this.loginRepository.getDeviceKeyById(id);
        return {id, device_key};
    }
    async bindUser(user, device){
        const id = await this.loginRepository.getIdByDeviceKey(device);
        this.loginRepository.insertUserId(id, user);
    }
}

module.exports = DeviceService;