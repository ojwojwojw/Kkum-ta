// 해당 Repository가 Device DB를 향한 것인지,
// Server DB를 향한 것인지 확인할 필요 있음
// 현재 이 GroupReop는 ServerDB로 전송하는 기능임에 유의
const Repository = require('./Repository'); 

class TimerGroupRepository extends Repository {
    constructor() {
        super();
    }

    async insertGroup(groupName) {
        sql = "INSERT INTO group_tbl (name) VALUES (?)";
        params = [groupName];
        this.query(sql, params);
    }

}