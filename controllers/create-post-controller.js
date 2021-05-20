const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);

const multer = require(`multer`);
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

var createPostController = {
    getCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-post`);
    },

    uploadImage: function(req, res, next) {
        return upload.single('thumbnail')(req, res, function () {
            next()
        });
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
        console.log(req.body);
        console.log(req.file);
        //MediaContent
        // if(req.body.thumbnail) {
        if (req.file) {
            post.media = `/uploads/` + req.file.filename;
            // var img = fs.readFileSync(req.file.path);
            // var encode_image = img.toString('base64');
            //
            // post.media.data = new Buffer(encode_image, 'base64');
            // post.media.contentType = req.file.mimetype;

            // post.media = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.path));

            // post.media.contentType = 'image/png';

            // console.log(req.file);
            // upload(req, res, function (err) {
            //     if (err) {
            //       // An error occurred when uploading
            //       console.log('Err: ', err);
            //       return;
            //     } else {
            //         // var img = fs.readFileSync(req.file.path);
            //         // var encode_image = img.toString('base64');
            //         //
            //         // post.media.data = new Buffer(encode_image, 'base64');
            //         // post.media.contentType = req.file.mimetype;
            //         //
            //         // post.media.data = fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.filename));
            //         // post.media.contentType = 'image/png';
            //
            //        console.log('req.file: ', JSON.stringify(req.file));
            //        console.log('req.files: ', JSON.stringify(req.files));
            //        return;
            //     }
            // });
        };

        db.insertOne(Post, post, function(result) {
            console.log("ID IS THIS: " + result._id);
            if (result)
                res.redirect(`/post/` + result._id);
        });
    }
}

module.exports = createPostController;
