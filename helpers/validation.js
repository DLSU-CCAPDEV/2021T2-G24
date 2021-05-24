// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    signupValidation: function () {

        var validation = [
            // checks if `fullname` is not empty
            check('fullname', 'Fullname should not be empty').notEmpty(),

            // checks if `email` is not empty
            check('email', 'Email should not be empty').notEmpty(),

            // checks if `email` is a valid email address
            check('email', 'A valid email address is required').isEmail(),

            // checks if `username` is not empty
            check('username', 'Username should not be empty').notEmpty(),

            // checks if `password` is not empty
            check('password', 'Password should not be empty').notEmpty()
        ];

        return validation;
    },

    commentValidation: function() {
        var validation = [
                //checks if `comment` is not empty
                check('comment', 'Comment should not be empty').notEmpty()
        ];

        return validation;
    },

    settingsValidation: function() {
        var validation = [
            // checks if `fullname` is not empty
            check('fullname', 'Fullname should not be empty').notEmpty(),

            // checks if `email` is not empty
            check('email', 'Email should not be empty').notEmpty(),

            // checks if `email` is a valid email address
            check('email', 'A valid email address is required').isEmail(),

            // checks if `username` is not empty
            check('username', 'Username should not be empty').notEmpty(),
        ];

        return validation;
    },

    featuredValidation: function() {
        var validation = [
            // checks if `title` is not empty
            check('title', 'Title should not be empty').notEmpty(),

            // checks if `synopsis` is not empty
            check('synopsis', 'Synopsis should not be empty').notEmpty(),

            // checks if `link` is not empty
            check('link', 'Link should not be empty').notEmpty(),

            // checks if `link` is a valid URL
            check('link', 'A valid link is required').isURL(),
        ];

        return validation;
    }

}

module.exports = validation;
