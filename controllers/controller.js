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
