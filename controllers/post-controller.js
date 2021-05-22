const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);
const User = require(`../models/user-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const multer = require(`multer`);
const path = require('path');
const fs = require(`fs`);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const postController = {

    getCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-post`);
    },

    uploadPostImage: function(req, res, next) {
        return upload.single('media')(req, res, function () {
            next()
        });
    },

    postCreatePost: function (req, res) {

        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        var post = {
            title: req.body.title,
            userID: req.session.userID,
            tags: new Array()
        };

        // Tags
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
        if (req.file) {

            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');

            post.media = {
                data: new Buffer(encode_image, 'base64'),
                contentType: req.file.mimetype
            }
        };

        db.insertOne(Post, post, function(result) {
            console.log("ID IS THIS: " + result._id);
            if (result)
                res.redirect(`/post/` + result._id);
        });
    },

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;

                db.findOne(User, {_id: new ObjectId(result.userID)}, function (result) {
                    res.locals.post.username = result.username;
                    res.render(`post`);
                });
            } else {
                // TODO: add page not found page?
            }
        });
    }
}

module.exports = postController;
