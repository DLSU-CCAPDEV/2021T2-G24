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
                        comment.username = result.username;
                        comment.profile_picture = result.profile_picture;
                    }
                });
            });
            next();
        });
    },

    updateCommentUpvote: function(req, res) {
        if(req.session.userID) {
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, function(result) {

                var status = {};

                var commentID = req.query.commentID;
                var userID = req.session.userID;

                if (result.upvotes.includes(userID)) { //upvote is activated
                    status.upvote = true;

                    //decrease upvote counter
                    db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {upvotes: userID}}, function(){});
                } else { //upvote is not activated
                    status.upvote = false;

                    if (result.downvotes.includes(userID)) { //downvote is activated
                        status.downvote = true;

                        //increase upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {upvotes: userID}}, function(){});

                        //decrease downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {downvotes: userID}}, function(){});
                    } else { //downvote is not activated
                        status.downvote = false;

                        //increase upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {upvotes: userID}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    updateCommentDownvote: function(req, res) {
        if(req.session.userID) {
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, function(result) {

                var status = {};

                var commentID = req.query.commentID;
                var userID = req.session.userID;

                if (result.downvotes.includes(userID)) { //downvote is activated
                    status.downvote = true;

                    //decrease downvote counter
                    db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {downvotes: userID}}, function(){});
                } else { //downvote is not activated
                    status.downvote = false;

                    if (result.upvotes.includes(userID)) { //upvote is activated
                        status.upvote = true;

                        //increase downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {downvotes: userID}}, function(){});

                        //decrease upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {upvotes: userID}}, function(){});
                    } else { //upvote is not activated
                        status.upvote = false;

                        //increase downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {downvotes: userID}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    checkCommentVotes: function(req, res) {
        if (req.session.userID) {
            var query = {
                postID: req.query.postID,
                $or: [
                    {upvotes: {$in: [req.session.userID]}},
                    {downvotes: {$in: [req.session.userID]}}
                ]
            }

            db.findMany(Comment, query, function(result) {
                var userID = req.session.userID;
                var upvotes = [];
                var downvotes = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].upvotes.includes(userID)) {
                        upvotes.push(result[i]);
                    } else if (result[i].downvotes.includes(userID)) {
                        downvotes.push(result[i]);
                    }
                }
                res.send({upvotes: upvotes, downvotes: downvotes})
            });
        }
    }
}

module.exports = commentController;
