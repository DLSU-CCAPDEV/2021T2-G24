//Constructors
//Featured Work
var FeatWork = function(title, synopsis, image, url){
    this.title = title;
    this.synopsis = synopsis;
    this.image = image;
    this.url = url;
};

//Comment
var Comment = function(id, username, date, content) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.upvote = new Array();
    this.downvote = new Array();
};

//Post
var Post = function(title, username, date) {
    this.title = title;
    this.username = username;
    this.date = date;
    this.tag = new Array();
    this.general;
    this.plot;
    this.characters;
    this.setting;
    this.media;
    this.upvote = new Array();
    this.downvote = new Array();
    this.comment = 0;
}

//User
var User = function(fullname, email, username, password) {
    this.fullname = fullname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.about_me;
    this.followed_users = new Array();
    this.followed_tags= new Array();
    this.feat_works = new Array();
    this.fav_works = new Array();
};

/**************************************************************************************************************************************************/

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

        /*
    	var user = {
            fullname: fullname,
            email: email,
    		username: username,
    		password: password,
    	}
        */
        var user = new User(fullname, email, username, password);

        db.insertOne(`users`, user, function(result) {
            if (result)
                res.redirect(307, `/sign-up-success`);
        });
    },

    postSignUpSucess: function(req, res) {
        var username = req.body.username;

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

    	var user = {
    		username: username,
    		password: password
    	}

        db.findOne(`users`, user, function(result) {
            if(result) {
                res.redirect(307, `/feed`);
            } else {
                res.redirect(`/sign-in-failure`);
            }
        });
    },

    getSignInFailure: function(req, res) {
        res.render(`sign-in-failure`);
    },

    getCustomFeed: function(req, res, next) {

        var username = req.body.username;

        db.findOne(`users`, {username: username}, function (result) {

            var followed_users = result.followed_users;
            var followed_tags = result.followed_tags;
            var query = {
                $or: [
                    {username: {$in: Object.values(followed_users)}},
                    {tags: {$in: Object.values(followed_tags)}}
                ]
            }
            console.log(followed_users);
            console.log(followed_tags);
            db.findMany(`posts`, query, function (result) {
                res.locals.custom_posts = result;
            });

            // TODO: add code to sort
            next();
        });


    },

    getHotFeed: function(req, res, next) {
        db.findMany(`posts`, {}, function (result) {
            // result.sort()
            res.locals.hot_posts = result;
            next();

            // TODO: add code to sort
            // sort
        });
    },

    getNewFeed: function(req, res, next) {
        db.findMany(`posts`, {}, function (result) {
            res.locals.new_posts = result;
            next();
            // TODO: add code to sort
            // sort()
        });
    },

    getFeed: function (req, res) {
        res.render(`feed`);
    },

    postFeed: function (req, res) {
        res.locals.username = req.body.username;

        res.render(`feed`);
    },

    getProfilePosts: function(req, res, next) {
        var query = {
            username: req.params.username,
        };

        db.findOne(`users`, query, function(result) {

            db.findMany(`posts`, query, function(result) {
                res.locals.posts = result;
            });
            next();
        });
    },

    getProfileComments: function(req, res, next) {
        var query = {
            username: req.params.username,
        };

        db.findOne(`users`, query, function(result) {

            db.findMany(`comments`, query, function(result) {
                res.locals.comments = result;
            });
            next();
        });
    },

    getProfileFollowed: function(req, res, next) {
        var query = {
            username: req.params.username
        };

        db.findOne(`users`, query, function(result) {
            var followed_users = result.followed_users;
            var followQuery = {
                username: {$in: Object.values(followed_users)}
            };

            db.findMany(`users`, followQuery, function(result) {
                res.locals.users = result;
            });
            next();
        });
    },

    getProfileUser: function(req, res, next) {
        var query = {
            username: req.params.username
        };

        db.findOne(`users`, query, function(result) {
            res.locals.user = result;
            next();
        });
    },

    getProfile: function(req, res) {
        res.render(`profile`);
    }


}

module.exports = controller;
