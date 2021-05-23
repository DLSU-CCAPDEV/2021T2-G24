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
        if(req.session.username) {
            res.redirect(`/feed`);
        } else {
            res.render(`index`);
        }
    },

    // functions related to js

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
    },

    getPageNotFound: function (req, res) {
        res.render(`page-not-found`);
    }
}

module.exports = controller;
