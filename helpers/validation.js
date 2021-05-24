// import module `check` from `express-validator`
const { check } = require('express-validator');
const { oneOf } = require('express-validator');
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
    },

    postGeneralValidation: function() {
        var validation = [
            check('titleGeneral', 'Title should not be empty').notEmpty(),
            check('tagsGeneral', 'Tags should not be empty').notEmpty(),
            check('genContent', 'General content should not be empty').notEmpty()
        ];

        return validation;
    },

    postStoryValidation: function() {
        var validation = [
            check('titleStory', 'Title should not be empty').notEmpty(),
            check('tagsStory', 'Tags should not be empty').notEmpty(),
            oneOf([
                check('plotContent', 'Plot content should not be empty').notEmpty(),
                check('charContent', 'Character content should not be empty').notEmpty(),
                check('settingContent', 'Setting content should not be empty').notEmpty()
            ], 'Please enter content to at least one of the fields.')
        ];

        return validation;
    },

    postMediaValidation: function() {
        var validation = [
            check('titleMedia', 'Title should not be empty').notEmpty(),
            check('tagsMedia', 'Tags should not be empty').notEmpty()
        ];

        return validation;
    },

    postGenUpdateValidation: function() {
        var validation = [
            check('title', 'Title should not be empty').notEmpty(),
            check('tags', 'Tags should not be empty').notEmpty(),
            check('genContent', 'General content should not be empty').notEmpty()
        ];

        return validation;
    },

    postStoryUpdateValidation: function() {
        var validation = [
            check('title', 'Title should not be empty').notEmpty(),
            check('tags', 'Tags should not be empty').notEmpty(),
            oneOf([
                check('plotContent', 'Plot content should not be empty').notEmpty(),
                check('charContent', 'Character content should not be empty').notEmpty(),
                check('settingContent', 'Setting content should not be empty').notEmpty()
            ], 'Please enter content to at least one of the fields.')
        ];

        return validation;
    },

    postMediaUpdateValidation: function() {
        var validation = [
            check('title', 'Title should not be empty').notEmpty(),
            check('tags', 'Tags should not be empty').notEmpty()
        ];

        return validation;
    }
}

module.exports = validation;
