const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Post = require(`../models/post-model.js`);

var searchResultsController = {
    getPosts: function(req, res, next) {
        db.findMany(Post, {}, ``, function(result) {
            res.locals.matched_posts = result;
            next();
        });
    },

    getUsers: function(req, res, next) {
        db.findMany(User, {}, ``, function(result) {
            res.locals.matched_users = result;
            next();
        });
    },

    getTags: function(req, res, next) {
        db.findMany(User, {}, ``, function(result) {

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

module.exports = searchResultsController;
