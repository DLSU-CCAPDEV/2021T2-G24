const db = require(`../models/db.js`);

const controller = {
    getIndex: function(req, res) {
        res.render(`index`);
    },

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
    		password: password
    	}

        db.insertOne(`users`, user, function(result) {
            if (result)
                res.render('sign-up-success');
        });

    },

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

        db.findOne(`users`, user, function(result) {
            if(result) {
                res.render('feed');
            } else {
                res.render('sign-in-failure');
            }
        });
    },

    getProfile: function(req, res) {
        //get the values from the database
        //For now we're hardcoding for simulation purposes
        /*
        var person = {
            fn: `Ned`,//should be from database
            ln: `Stark`//should be from database
        };
        */

        var person = {
            username: req.params.username,
    		realname: `Howard Philips`
        };
        //first parameter is the rendering of file, succeeding are objects
        res.render(`profile`, person);
    }
}

module.exports = controller;
