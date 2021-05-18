const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);
const Comment = require(`../models/comment-model.js`);
var ObjectId = require(`mongodb`).ObjectID;

var postController = {
    getComments: function(req, res, next) {
        db.findMany (Comment, {postID: req.params.postID}, function(result) {
            res.locals.comments = result;
            next();
        });
    },

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;
                res.render(`post`);
            } else {
                // TODO: add page not found page?
            }
        });
    }
}

module.exports = postController;
