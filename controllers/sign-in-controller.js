const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);

const bcrypt = require(`bcryptjs`);
const saltRounds = 10;
const { validationResult } = require('express-validator');

const signInController = {
    getSignUp: function(req, res) {
        if (req.session.username) {
            res.redirect(`/feed`);
        } else {
            res.render(`sign-up`);
        }
    },

    postSignUp: function(req, res) {

        // fetches validation errors
        var errors = validationResult(req);

        // if there are validation errors
        if (!errors.isEmpty()) {

            // get the array of errors
            errors = errors.errors;

            var details = {};

            if(errors.length > 0)
                details['error'] = errors[0].msg

            res.render('sign-up', details);
        } else {
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
        }
    },

    getCheckUsername: function(req, res) {
        // your code here
        var old_username = req.session.username;
        var new_username = req.query.username;

        //No changes to the initial username
        if(old_username == new_username) {
            res.send(false);
        }
        //There's a change
        else {
            db.findOne(User, {username: new_username}, function(result) {
                //Found a title dupe
                if(result) {
                    res.send(true);
                }
                //No dupes
                else {
                    res.send(false);
                }
            }, ``);
        }
    },

    getSignUpFailure: function(req, res) {
        res.render(`sign-up-failure`);
    },

    getSignUpSucess: function(req, res) {

        var user = {
            new_user: req.query.username
        }

        res.render(`sign-up-success`, user);
    },

    getSignIn: function(req, res) {
        if (req.session.username) {
            res.redirect(`/feed`);
        } else {
            res.render(`sign-in`);
        }
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
