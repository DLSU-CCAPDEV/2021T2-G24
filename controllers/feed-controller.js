const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Post = require(`../models/post-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const feedController = {

    getCustomFeed: function(req, res, next) {

        if (req.session.username) {
            var username = req.session.username

            db.findOne(User, {username: username}, function (result) {

                var followed_users = result.followed_users;
                var followed_tags = result.followed_tags;
                var query = {
                    $or: [
                        {userID: {$in: Object.values(followed_users)}},
                        {tags: {$in: Object.values(followed_tags)}}
                    ]
                }

                db.findMany(Post, query, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i].type = `custom`;
                    }

                    // Sort by Hot
                    result.sort(function(a, b) {
                        return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
                    });

                    res.locals.custom_posts = result;

                    res.locals.custom_posts.forEach(function (post) {
                        db.findOne(User, {_id: new ObjectId(post.userID)}, function (result) {
                            if (result) {
                                post.username = result.username;
                            }
                        });
                    });
                    next();
                });
            });
        } else {
            next();
        }
    },

    getHotFeed: function(req, res, next) {
        db.findMany(Post, {}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `hot`;
            }

            // Hot = #upvotes - #downvotes
            result.sort(function(a, b) {
                return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
            });

            res.locals.hot_posts = result;

            res.locals.hot_posts.forEach(function (post) {
                db.findOne(User, {_id: new ObjectId(post.userID)}, function (result) {
                    if (result) {
                        post.username = result.username;
                    }
                });
            });

            next();
        });
    },

    getNewFeed: function(req, res, next) {
        db.findMany(Post, {}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `new`;
            }

            res.locals.new_posts = result;

            res.locals.new_posts.forEach(function (post) {
                db.findOne(User, {_id: new ObjectId(post.userID)}, function (result) {
                    if (result) {
                        post.username = result.username;
                    }
                });
            });

            next();
        }, ``, {_id: -1});
    },

    getFeed: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`feed`);
    }
}

module.exports = feedController;
