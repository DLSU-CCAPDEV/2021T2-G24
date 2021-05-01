var ObjectId = require('mongodb').ObjectID;

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

        db.findOne(`users`, {username: username}, function(result) {
            if (result) {
                res.redirect(`sign-up-failure`);
            } else {
                db.insertOne(`users`, user, function(result) {
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
    },

    getSignOut: function(req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/');
        });
    },

    getCustomFeed: function(req, res, next) {

        if (req.session.username) {
            var username = req.session.username

            db.findOne(`users`, {username: username}, function (result) {

                var followed_users = result.followed_users;
                var followed_tags = result.followed_tags;
                var query = {
                    $or: [
                        {username: {$in: Object.values(followed_users)}},
                        {tags: {$in: Object.values(followed_tags)}}
                    ]
                }

                db.findMany(`posts`, query, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i].type = "custom";
                    }

                    // Sort by Hot
                    result.sort(function(a, b) {
                        return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
                    });

                    res.locals.custom_posts = result;
                    next();
                });
            });
        } else {
            next();
        }
    },

    getHotFeed: function(req, res, next) {
        db.findMany(`posts`, {}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = "hot";
            }

            // Hot = #upvotes - #downvotes
            result.sort(function(a, b) {
                return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
            });

            res.locals.hot_posts = result;
            next();
        });
    },

    getNewFeed: function(req, res, next) {
        db.findMany(`posts`, {}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = "new";
            }

            res.locals.new_posts = result;
            next();
        }, {_id: -1});
    },

    getTrendingTags: function(req, res, next) {
        db.findMany(`posts`, {}, function (result) {
            var tags = [];

            for (var i = 0; i < result.length; i++) {
                tags = tags.concat(result[i].tags);
            }

            var tags_count = [];
            var previous;
            tags.sort();
            for (var i = 0; i < tags.length; i++) {
                if (tags[i] != previous) {
                    tags_count.push({tag: tags[i], count: 1});
                } else {
                    tags_count[tags_count.length-1].count++;
                }
                previous = tags[i];
            }

            tags_count.sort(function(a, b) {
                return b.count-a.count;
            });

            res.locals.trending_tags = tags_count;
            next();
        }, null, {_id: 0, tags: 1});
    },

    getFeed: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`feed`);
    },

    getHotTag: function(req, res, next) {
        db.findMany(`posts`, {tags: req.params.tag}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = "hot";
            }

            // Hot = #upvotes - #downvotes
            result.sort(function(a, b) {
                return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
            });

            res.locals.hot_posts = result;
            next();
        });
    },

    getNewTag: function(req, res, next) {
        db.findMany(`posts`, {tags: req.params.tag}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = "new";
            }

            res.locals.new_posts = result;
            next();
        }, {_id: -1});
    },

    getTag: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`tag`);
    },

    getCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-post`);
    },

    postCreatePost: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

    	var user = {
    		username: username,
    		password: password
    	}

        db.findOne(`users`, user, function(result) {
            if(result) {
                req.session.username = user.username;
                req.session.password = user.password;
                res.redirect(`/feed`);
            } else {
                res.redirect(`/sign-in-failure`);
            }
        });
    },

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (`posts`, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;
                res.render(`post`);
            } else {
                // TODO: add page not found page?
            }
        });
    },

    getProfilePosts: function(req, res, next) {

        db.findMany(`posts`, {username: req.params.username}, function(result) {
            res.locals.posts = result;
            next();
        }, {_id: -1});
    },

    getProfileComments: function(req, res, next) {

        db.findMany(`comments`, {username: req.params.username}, function(result) {
            res.locals.comments = result;
            next();
        }, {_id: -1});
    },

    getProfileFollowedUsers: function(req, res, next) {

        db.findOne(`users`, {username: req.params.username}, function(result) {

            var followed_users = result.followed_users;
            var query = {
                username: {$in: Object.values(followed_users)}
            };

            db.findMany(`users`, query, function(result) {
                res.locals.followed_users = result;
                next();
            });
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
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`profile`);
    },

    getProfileSettings: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
            db.findOne(`users`, {username: res.locals.username}, function(result) {
                var user = result;
                res.render(`settings`, user);
            });
        }
    },

    getAdvancedSearch: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`advanced-search`);
    },

    getMatchedPosts: function(req, res, next) {
        db.findMany(`posts`, {}, function(result) {
            res.locals.matched_posts = result;
            next();
        });
    },

    getMatchedUsers: function(req, res, next) {
        db.findMany(`users`, {}, function(result) {
            res.locals.matched_users = result;
            next();
        });
    },

    getMatchedTags: function(req, res, next) {
        db.findMany(`users`, {}, function(result) {

            var tags = [];

            for (var i = 0; i < result.length; i++) {
                tags = tags.concat(result[i].followed_tags);
            }

            res.locals.matched_tags = tags;
            next();
        });
    },

    getSearchResults: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`search-results`);
    }

}

module.exports = controller;
