const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);

const bcrypt = require(`bcryptjs`);
const saltRounds = 10;

const signInController = {
    getSignUp: function(req, res) {
        res.render(`sign-up`);
    },

    postSignUp: function(req, res) {
        var fullname = req.body.fullname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        bcrypt.hash(password, saltRounds, function(err, hash) {

            var user = {
                fullname: fullname,
                email: email,
                username: username,
                password: hash,
            }

            db.findOne(User, {username: username}, function(result) {
                if (result) {
                    res.redirect(`/sign-up-failure`);
                } else {
                    db.insertOne(User, user, function(result) {
                        if (result)
                            res.redirect(`/sign-up-success?username=` + username);
                    });
                }
            });

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
    },

    getSignIn: function(req, res) {
        res.render(`sign-in`);
    },

    postSignIn: function(req, res) {

        var username = req.body.username;
        var password = req.body.password;

        db.findOne(User, { username: username }, function(result) {
            if(result) {
                bcrypt.compare(password, result.password, function(err, equal) {
                    if (equal) {
                        req.session.username = result.username;
                        req.session.userID = result._id;
                        req.session.password = result.password;

                        res.redirect(`/feed`);
                    } else {
                        res.redirect(`/sign-in-failure`);
                    }
                });

            } else {
                res.redirect(`/sign-in-failure`);
            }
        });
    },

    getSignInFailure: function(req, res) {
        res.render(`sign-in-failure`);
    },

    getSignOut: function(req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect(`/`);
        });
    }
}

module.exports = signInController;
