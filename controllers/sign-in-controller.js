const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);

const bcrypt = require(`bcrypt`);

const signInController = {
    getSignIn: function(req, res) {
        res.render(`sign-in`);
    },

    postSignIn: function(req, res) {

        var username = req.body.username;
        var password = req.body.password;

        db.findOne(User, { username: username }, ``, function(result) {
            if(result) {
                bcrypt.compare(password, result.password, function(err, equal) {
                    if (equal) {
                        req.session.username = result.username;
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
    }
}

module.exports = signInController;
