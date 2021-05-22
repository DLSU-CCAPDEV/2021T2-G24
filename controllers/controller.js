var ObjectId = require(`mongodb`).ObjectID;
//Constructors
//Featured Work
var FeatWork = function(title, synopsis, image, url){
    this.title = title;
    this.synopsis = synopsis;
    this.image = image;
    this.url = url;
};
//
// //Comment
// var Comment = function(id, username, date, content) {
//     this.postID = id;
//     this.username = username;
//     this.date = date;
//     this.content = content;
//     this.upvotes = new Array();
//     this.downvotes = new Array();
// };

//Post
// var Post = function(title, username, date) {
//     this.title = title;
//     this.username = username;
//     this.date = date;
//     this.tags = new Array();
//     this.general;
//     this.plot;
//     this.characters;
//     this.setting;
//     this.media;
//     this.upvotes = new Array();
//     this.downvotes = new Array();
//     this.comments = 0;
// }

//User
// var User = function(fullname, email, username, password) {
//     this.fullname = fullname;
//     this.email = email;
//     this.username = username;
//     this.password = password;
//     this.about_me = "";
//     this.followed_users = new Array();
//     this.followed_tags= new Array();
//     this.featured_works = new Array();
//     this.favorite_works = new Array();
// };

/**************************************************************************************************************************************************/

const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Comment = require(`../models/comment-model.js`);
const Post = require(`../models/post-model.js`);

const controller = {
    getIndex: function(req, res) {
        res.render(`index`);
    },

    getSignOut: function(req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect(`/`);
        });
    },

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

    getTag: function(req, res) {
        res.locals.tag = req.params.tag;

        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`tag`);
    },

    getAdvancedSearch: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`advanced-search`);
    },

    // functions related to js

    updateCommentUpvote: function(req, res) {
        if(req.session.username) {
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, function(result) {

                var status = {};

                var commentID = req.query.commentID;
                var username = req.session.username;

                if (result.upvotes.includes(username)) { //upvote is activated
                    status.upvote = true;

                    //decrease upvote counter
                    db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {upvotes: username}}, function(){});
                } else { //upvote is not activated
                    status.upvote = false;

                    if (result.downvotes.includes(username)) { //downvote is activated
                        status.downvote = true;

                        //increase upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {upvotes: username}}, function(){});

                        //decrease downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {downvotes: username}}, function(){});
                    } else { //downvote is not activated
                        status.downvote = false;

                        //increase upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {upvotes: username}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    updateCommentDownvote: function(req, res) {
        if(req.session.username) {
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, function(result) {

                var status = {};

                var commentID = req.query.commentID;
                var username = req.session.username;

                if (result.downvotes.includes(username)) { //downvote is activated
                    status.downvote = true;

                    //decrease downvote counter
                    db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {downvotes: username}}, function(){});
                } else { //downvote is not activated
                    status.downvote = false;

                    if (result.upvotes.includes(username)) { //upvote is activated
                        status.upvote = true;

                        //increase downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {downvotes: username}}, function(){});

                        //decrease upvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$pull: {upvotes: username}}, function(){});
                    } else { //upvote is not activated
                        status.upvote = false;

                        //increase downvote counter
                        db.updateOne(Comment, {_id: new ObjectId(commentID)}, {$push: {downvotes: username}}, function(){});
                    }
                }
                res.send(status);
            });
        }
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
    },

    checkCommentVotes: function(req, res) {
        if (req.session.username) {
            var query = {
                postID: req.query.postID,
                $or: [
                    {upvotes: {$in: [req.session.username]}},
                    {downvotes: {$in: [req.session.username]}}
                ]
            }

            db.findMany(Comment, query, function(result) {
                var username = req.session.username;
                var upvotes = [];
                var downvotes = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].upvotes.includes(username)) {
                        upvotes.push(result[i]);
                    } else if (result[i].downvotes.includes(username)) {
                        downvotes.push(result[i]);
                    }
                }
                res.send({upvotes: upvotes, downvotes: downvotes})
            });
        }
    },

    checkFollowing: function(req, res) {
        if (req.session.username) {
            db.findOne(User, {username: req.session.username}, function(result) {
                res.send(result);
            });
        }
    },

    checkStatus: function(req, res) {
        res.send(req.session.username);
    },

    getCheckUsername: function(req, res) {
        // your code here
        var old_username = req.session.username;
        var new_username = req.query.username;

        //No changes to the initial username
        if(old_username == new_username) {
            res.send(false);
        }
        //There's a change
        else {
            db.findOne(User, {username: new_username}, function(result) {
                //Found a title dupe
                if(result) {
                    res.send(true);
                }
                //No dupes
                else {
                    res.send(false);
                }
            }, ``);
        }
    }
}

module.exports = controller;
