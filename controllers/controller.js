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

    getCustomFeed: function(req, res, next) {

        if (req.session.username) {
            var username = req.session.username

            db.findOne(User, {username: username}, ``, function (result) {

                var followed_users = result.followed_users;
                var followed_tags = result.followed_tags;
                var query = {
                    $or: [
                        {username: {$in: Object.values(followed_users)}},
                        {tags: {$in: Object.values(followed_tags)}}
                    ]
                }

                db.findMany(Post, query, ``, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i].type = `custom`;
                    }

                    // Sort by Hot
                    result.sort(function(a, b) {
                        return (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length);
                    });

                    res.locals.custom_posts = result;
                    next();
                });
            });
        } else {
            next();
        }
    },

    getHotFeed: function(req, res, next) {
        db.findMany(Post, {}, ``, function (result) {
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

    getNewFeed: function(req, res, next) {
        db.findMany(Post, {}, ``, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `new`;
            }

            res.locals.new_posts = result;
            next();
        }, {_id: -1});
    },

    getTrendingTags: function(req, res, next) {
        db.findMany(Post, {}, ``, function (result) {
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
        }, null, {_id: 0, tags: 1});
    },

    getFeed: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`feed`);
    },

    getHotTag: function(req, res, next) {
        db.findMany(Post, {tags: req.params.tag}, ``, function (result) {
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
        db.findMany(Post, {tags: req.params.tag}, ``, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].type = `new`;
            }

            res.locals.new_posts = result;
            next();
        }, {_id: -1});
    },

    getTag: function(req, res) {
        res.locals.tag = req.params.tag;

        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`tag`);
    },

    getCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-featured-work`);
    },

    postCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        var featWork = new FeatWork(req.body.title, req.body.synopsis, req.body.thumbnail, req.body.link);

        db.updateOne(User, {username: req.session.username}, {$push: {featured_works : featWork}}, function(){
            res.redirect(`/settings/`);
        });
    },

    getCreateComment: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        //Get the post
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, ``, function(result) {
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

        var comment = {
            postID: req.params.postID,
            username: req.session.username,
            date: new Date(),
            content: req.body.comment
        };

        db.insertOne(Comment, comment, function(result) {
            if (result) {
                //Get the post
                db.updateOne(Post, {_id: new ObjectId(req.params.postID)}, {$inc: {comments: 1}}, function(){});
                res.redirect(`/post/` + req.params.postID);
            }
        });
    },

    postEditComment: function (req, res) {
        db.updateOne(Comment, {_id: new ObjectId(req.params.commentID)}, {$set: {content: req.body.comment}}, function(result){});

        db.findOne(Comment, {_id: new ObjectId(req.params.commentID)}, ``, function(result) {
            if(result)
                res.redirect(`/post/` + result.postID);
        });
    },

    getEditComment: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Comment, {_id: new ObjectId(req.params.commentID)}, ``, function(result) {
            if (result) {
                res.locals.comment = result;
                db.findOne(Post, {_id: new ObjectId(result.postID)}, ``, function(result) {
                    res.locals.post = result;
                    res.render(`edit-comment`);
                });
            } else {
                // TODO: add page not found page?
            }
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

    getDeleteComment: function(req, res) {
        db.findOne(Comment, {_id: new ObjectId(req.params.commentID)}, ``, function(result) {
            res.locals.postID = result.postID;
            console.log(`POST ID IS: ` + res.locals.postID)
            db.updateOne(Post, {_id: new ObjectId(result.postID)}, {$inc: {comments: -1}}, function(){
                db.deleteOne(Comment, {_id: new ObjectId(req.params.commentID)}, function(){
                    res.redirect(`../post/` + res.locals.postID);
                });
            });
        });
    },

    getCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-post`);
    },

    postCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        var post = {
            title: req.body.title,
            username: res.locals.username,
            date: new Date()
        };

        //Tags
        var rawTags = req.body.tags.split(" ");
        for(var i = 0; i < rawTags.length; i++) {
            if(rawTags[i] != "")
                post.tags.push(rawTags[i]);
        }

        //GenContent
        if(req.body.genContent) {
            post.general = req.body.genContent;
        }
        //PlotContent
        if(req.body.plotContent || req.body.charContent || req.body.settingContent) {
            post.plot = req.body.plotContent;
            post.characters = req.body.charContent;
            post.setting = req.body.settingContent;
        }
        //MediaContent
        if(req.body.thumbnail) {
            post.media = req.body.thumbnail;
        }


        db.insertOne(Post, post, function(result) {
            console.log("ID IS THIS: " + result.insertedId);
            if (result)
                res.redirect(`/post/` + result.insertedId);
        });
    },

    getEditPost: function (req, res) {

    },

    postDeletePost: function(req, res) {
        db.deleteOne(Post, {_id: new ObjectId(req.params.postID)}, function(result){
            if (result) {
                res.redirect(`/feed`);
            } else {
                ;
                // page not found
            }
        });
    },

    getComments: function(req, res, next) {
        db.findMany (Comment, {postID: req.params.postID}, ``, function(result) {
            res.locals.comments = result;
            next();
        });
    },

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, ``, function(result) {
            if (result) {
                res.locals.post = result;
                res.render(`post`);
            } else {
                // TODO: add page not found page?
            }
        });
    },

    getProfilePosts: function(req, res, next) {

        db.findMany(Post, {username: req.params.username}, ``, function(result) {
            res.locals.posts = result;
            next();
        }, {_id: -1});
    },

    getProfileComments: function(req, res, next) {

        db.findMany(Comment, {username: req.params.username}, ``, function(result) {
            res.locals.comments = result;
            next();
        }, {_id: -1});
    },

    getProfileFollowedUsers: function(req, res, next) {

        db.findOne(User, {username: req.params.username}, ``, function(result) {

            var followed_users = result.followed_users;
            var query = {
                username: {$in: Object.values(followed_users)}
            };

            db.findMany(User, query, ``, function(result) {
                res.locals.followed_users = result;
                next();
            });
        });
    },

    getProfileUser: function(req, res, next) {
        var query = {
            username: req.params.username
        };

        db.findOne(User, query, ``, function(result) {
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

    getProfileSettings: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
            db.findOne(User, {username: res.locals.username}, ``, function(result) {
                var user = result;
                res.render(`settings`, user);
            });
        }
    },

    getAdvancedSearch: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`advanced-search`);
    },

    // functions related to js

    updatePostUpvote: function(req, res) {
        if(req.session.username) {
            db.findOne(Post, {_id: new ObjectId(req.query.postID)}, ``, function(result) {

                var status = {};

                var postID = req.query.postID;
                var username = req.session.username;

                if (result.upvotes.includes(username)) { //upvote is activated
                    status.upvote = true;

                    //decrease upvote counter
                    db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {upvotes: username}}, function(){});
                } else { //upvote is not activated
                    status.upvote = false;

                    if (result.downvotes.includes(username)) { //downvote is activated
                        status.downvote = true;

                        //increase upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {upvotes: username}}, function(){});

                        //decrease downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {downvotes: username}}, function(){});
                    } else { //downvote is not activated
                        status.downvote = false;

                        //increase upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {upvotes: username}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    updatePostDownvote: function(req, res) {
        if(req.session.username) {
            db.findOne(Post, {_id: new ObjectId(req.query.postID)}, ``, function(result) {

                var status = {};

                var postID = req.query.postID;
                var username = req.session.username;

                if (result.downvotes.includes(username)) { //downvote is activated
                    status.downvote = true;

                    //decrease downvote counter
                    db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {downvotes: username}}, function(){});
                } else { //downvote is not activated
                    status.downvote = false;

                    if (result.upvotes.includes(username)) { //upvote is activated
                        status.upvote = true;

                        //increase downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {downvotes: username}}, function(){});

                        //decrease upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {upvotes: username}}, function(){});
                    } else { //upvote is not activated
                        status.upvote = false;

                        //increase downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {downvotes: username}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    updateCommentUpvote: function(req, res) {
        if(req.session.username) {
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, ``, function(result) {

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
            db.findOne(Comment, {_id: new ObjectId(req.query.commentID)}, ``, function(result) {

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
            db.findOne(User, {username: req.session.username}, ``, function (result) {

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
            db.findOne(User, {username: req.session.username}, ``, function (result) {

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

    checkPostVotes: function(req, res) {

        if (req.session.username) {
            var query = {
                $or: [
                    {upvotes: {$in: [req.session.username]}},
                    {downvotes: {$in: [req.session.username]}}
                ]
            }

            if (req.query.postID) {
                query._id = new ObjectId(req.query.postID);
            }

            db.findMany(Post, query, ``, function(result) {
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

    checkCommentVotes: function(req, res) {
        if (req.session.username) {
            var query = {
                postID: req.query.postID,
                $or: [
                    {upvotes: {$in: [req.session.username]}},
                    {downvotes: {$in: [req.session.username]}}
                ]
            }

            db.findMany(Comment, query, ``, function(result) {
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
            db.findOne(User, {username: req.session.username}, ``, function(result) {
                res.send(result);
            });
        }
    },

    checkStatus: function(req, res) {
        res.send(req.session.username);
    },

    getAddFavorite: function(req, res) {
        // your code here
        var username = req.query.username;
        var favorite_work = req.query.favorite_work;

        db.updateOne(User, {username: username}, {$push: {favorite_works: favorite_work}}, function(result){
            res.send(favorite_work);
        });
    },

    getDeleteFavorite: function (req, res) {
        // your code here
        var username = req.query.username;
        var title = req.query.title;
        console.log(username);
        console.log(title);
        db.updateOne(User, {username: username}, {$pull: {favorite_works: title}}, function(result){
            res.send(true);
        });
    }
}

module.exports = controller;
