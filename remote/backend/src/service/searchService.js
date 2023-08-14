class SearchService {
    constructor (userRepository) {
        this.userRepository = userRepository;
    }
    
    async SearchID(email) {
        try {
            const id = await this.userRepository.getIdByEmail(email);
            if (id === null) return {result:false, id:null};
            return {result:true, err:"no data"};
        } catch(err) {
            return {result:false, err:err};
        }
    }
}

module.exports = SearchService;