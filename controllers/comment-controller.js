const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Post = require(`../models/post-model.js`);
const Comment = require(`../models/comment-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const commentController = {
    getCreateComment: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        //Get the post
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;
            }
            res.render(`create-comment`);
        });
    },

    postCreateComment: function (req, res) {

        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        db.findOne(User, {username: req.session.username}, function (result) {
            if (result) {
                var comment = {
                    postID: req.params.postID,
                    userID: result._id,
                    content: req.body.comment
                };

                db.insertOne(Comment, comment, function(result) {
                    if (result) {
                        //Get the post
                        db.updateOne(Post, {_id: new ObjectId(req.params.postID)}, {$inc: {comments: 1}}, function(){
                            res.redirect(`/post/` + req.params.postID);
                        });
                    }
                });
            }
        });
    },

    getEditComment: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Comment, {_id: new ObjectId(req.params.commentID)}, function(result) {
            if (result) {
                res.locals.comment = result;
                db.findOne(Post, {_id: new ObjectId(result.postID)}, function(result) {
                    res.locals.post = result;
                    res.render(`edit-comment`);
                });
            } else {
                // TODO: add page not found page?
            }
        });
    },

    postEditComment: function (req, res) {
        db.updateOne(Comment, {_id: new ObjectId(req.params.commentID)}, {$set: {content: req.body.comment}}, function(result){});

        db.findOne(Comment, {_id: new ObjectId(req.params.commentID)}, function(result) {
            if(result)
            res.redirect(`/post/` + result.postID);
        });
    },

    getDeleteComment: function(req, res) {
        db.findOne(Comment, {_id: new ObjectId(req.params.commentID)}, function(result) {
            res.locals.postID = result.postID;
            db.updateOne(Post, {_id: new ObjectId(result.postID)}, {$inc: {comments: -1}}, function(){
                db.deleteOne(Comment, {_id: new ObjectId(req.params.commentID)}, function(){
                    res.redirect(`../post/` + res.locals.postID);
                });
            });
        });
    },

    postDeleteComment: function(req, res) {
        db.deleteOne(Comment, {_id: new ObjectId(req.body.commentID)}, function(result) {
            var status = {};
            if (result) { //success
                db.updateOne(Post, {_id: new ObjectId(req.body.postID)}, {$inc: {comments: -1}}, function(){});
                status.deleted = true;
            } else {
                status.deleted = false;
            }
            res.send(status);
        });
    },

    getComments: function(req, res, next) {
        db.findMany (Comment, {postID: req.params.postID}, function(result) {
            res.locals.comments = result;

            res.locals.comments.forEach(function (comment) {
                db.findOne(User, {_id: new ObjectId(comment.userID)}, function (result) {
                    if (result) {
                        console.log("username" + result.username)
                        comment.username = result.username;
                        comment.profile_picture = result.profile_picture;
                    }
                });
            });
            next();
        });
    }
}

module.exports = commentController;
