const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);

const signInController = {
    getSignIn: function(req, res) {
        res.render(`sign-in`);
    },

    postSignIn: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

    	var user = {
    		username: username,
    		password: password
    	}

        db.findOne(User, user, ``, function(result) {
            if(result) {
                req.session.username = user.username;
                req.session.password = user.password;
                res.redirect(`/feed`);
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
