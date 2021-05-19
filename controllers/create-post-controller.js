const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);

var createPostController = {
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
            date: new Date(),
            tags: new Array(),
            comments: 0
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
            console.log("ID IS THIS: " + result._id);
            if (result)
                res.redirect(`/post/` + result._id);
        });
    }
}

module.exports = createPostController;
