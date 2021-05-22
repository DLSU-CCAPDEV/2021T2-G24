const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Comment = require(`../models/comment-model.js`);
const Post = require(`../models/post-model.js`);
var ObjectId = require(`mongodb`).ObjectID;

const profileController = {
    getProfilePosts: function(req, res, next) {
        db.findOne(User, {username: req.params.username}, function (result) {
            db.findMany(Post, {userID: result._id}, function(result) {
                res.locals.posts = result;

                res.locals.posts.forEach(function (post) {
                    db.findOne(User, {_id: new ObjectId(post.userID)}, function (result) {
                        console.log(result.username);
                        if (result) {
                            post.username = result.username;
                        }
                    });
                });

                next();
            }, ``, {_id: -1});
        });
    },

    getProfileComments: function(req, res, next) {
        db.findOne(User, {username: req.params.username}, function (result) {
            db.findMany(Comment, {userID: result._id}, function(result) {
                res.locals.comments = result;

                res.locals.comments.forEach(function (comment) {
                    db.findOne(User, {_id: new ObjectId(comment.userID)}, function (result) {
                        console.log(result.username);
                        if (result) {
                            comment.username = result.username;
                        }
                    });
                });

                next();
            }, ``, {_id: -1});
        });
    },

    getProfileFollowedUsers: function(req, res, next) {

        db.findOne(User, {username: req.params.username}, function(result) {

            var followed_users = result.followed_users;
            var query = {
                username: {$in: Object.values(followed_users)}
            };

            db.findMany(User, query, function(result) {
                res.locals.followed_users = result;
                next();
            });
        });
    },

    getProfileUser: function(req, res, next) {
        var query = {
            username: req.params.username
        };

        db.findOne(User, query, function(result) {
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

    updateFollowedUsers: function(req, res) {
        if (req.session.username) {
            db.findOne(User, {username: req.session.username}, function (result) {

                var status = {};

                var userID = req.query.userID;
                var username = req.session.username;

                if (result.followed_users.includes(userID)) { //currently following the user
                    status.following = true;

                    //unfollow the user
                    db.updateOne(User, {username: username}, {$pull: {followed_users: userID}}, function(){});
                } else { //currently not following the user
                    status.following = false;

                    //follow the user
                    db.updateOne(User, {username: username}, {$push: {followed_users: userID}}, function(){});
                }
                res.send(status);
            });
        }
    }
}

module.exports = profileController;
