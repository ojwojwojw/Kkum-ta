const local = require('./localStrategy');
const UserRepository = require('../repository/userRepository');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        try {
            const userRepository = new UserRepository();
            const userInfo = userRepository.getUserById(user.id);
        
            if(userInfo){
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    })

    local(passport);
}