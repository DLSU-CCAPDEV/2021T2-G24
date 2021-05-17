const db = require(`../models/db.js`);
const User = require('../models/user-model.js');

const signUpController = {
    getSignUp: function(req, res) {
        res.render(`sign-up`);
    },

    postSignUp: function(req, res) {
        var fullname = req.body.fullname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        var user = {
            fullname: fullname,
            email: email,
            username: username,
            password: password,
        }

        db.findOne(User, {username: username}, ``, function(result) {
            if (result) {
                res.redirect(`/sign-up-failure`);
            } else {
                db.insertOne(User, user, function(result) {
                    if (result)
                        res.redirect(`/sign-up-success?username=` + username);
                });
            }

        });

    },
    getSignUpFailure: function(req, res) {
        res.render(`sign-up-failure`);
    },

    getSignUpSucess: function(req, res) {
        var username = req.query.username;

        var user = {
            username: username
        }

        res.render(`sign-up-success`, user);
    }
}

module.exports = signUpController;
