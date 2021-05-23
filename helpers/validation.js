// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    signupValidation: function () {

        var validation = [
            // checks if `fName` is not empty
            check('fullname', 'Fullname should not be empty.').notEmpty(),

            // checks if `idNum` contains exactly 8 digits
            check('email', 'Email should not be empty.').notEmpty(),

            // checks if `email` is a valid email address
            check('email', 'A valid email address is required.').isEmail(),

            // checks if `pw` contains at least 8 characters
            check('username', 'Username should not be empty.').notEmpty()
        ];

        return validation;
    },

}

module.exports = validation;
