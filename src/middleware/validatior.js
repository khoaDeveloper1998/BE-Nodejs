const { check} = require('express-validator');


// validator for Register Station
let validateRegisterStation = () => {
    return [
        check('id', 'id must not empty').not().isEmpty(),
        check('last_run', 'last run dont have the right format').isISO8601('yyyy-mm-dd'),
        check('histo_flag', 'histo_flag must be number 1(true) and 0(flase)').isInt(),
        check('realtime_flag', 'realtime_flag must be number 1(true) and 0(flase)').isInt()
    ]
}


// validate for Register User
let validateRegisterUser = () => {
    return [
        check('username', 'username must be string').isString(),
        check('email','email must have to right format').isEmail()
    ]
}
module.exports = {
    validateRegisterStation,
    validateRegisterUser
}