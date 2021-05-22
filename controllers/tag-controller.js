const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Post = require(`../models/post-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const tagController = {
    getHotTag: function(req, res, next) {
        db.findMany(Post, {tags: req.params.tag}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `hot`;
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
        db.findMany(Post, {tags: req.params.tag}, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `new`;
            }

            res.locals.new_posts = result;
            next();
        }, ``, {_id: -1});
    },

    getTrendingTags: function(req, res, next) {
        db.findMany(Post, {}, function (result) {
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
        }, `tags`);
    },

    getTag: function(req, res) {
        res.locals.tag = req.params.tag;

        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`tag`);
    },

    updateFollowedTags: function(req, res) {
        if (req.session.username) {
            db.findOne(User, {username: req.session.username}, function (result) {

                var status = {};

                var tagID = req.query.tagID;
                var username = req.session.username;

                if (result.followed_tags.includes(tagID)) { //currently following the tag
                    status.following = true;

                    //unfollow the tag
                    db.updateOne(User, {username: username}, {$pull: {followed_tags: tagID}}, function(){});
                } else { //currently not following the tag
                    status.following = false;

                    //follow the tag
                    db.updateOne(User, {username: username}, {$push: {followed_tags: tagID}}, function(){});
                }
                res.send(status);
            });
        }
    }
}

module.exports = tagController;
