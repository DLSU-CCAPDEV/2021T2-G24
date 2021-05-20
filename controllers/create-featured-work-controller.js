const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);

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

var createFeaturedWorkController = {

    getCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-featured-work`);
    },

    uploadImage: function(req, res, next) {
        return upload.single('featured')(req, res, function () {
            next()
        });
    },

    postCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        var featuredWork = {
            title: req.body.title,
            synopsis: req.body.synopsis,
            image: {
                data: new Buffer(fs.readFileSync(`public/images/blank.jpg`).toString('base64'), 'base64'),
                contentType: `image/jpeg`
            },
            url: req.body.link
        }
        console.log(req.file);
        if (req.file) {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');

            featuredWork.image = {
                data: new Buffer(encode_image, 'base64'),
                contentType: req.file.mimetype
            }
        };

        db.updateOne(User, {username: req.session.username}, {$push: {featured_works : featuredWork}}, function(){
            res.redirect(`/settings/`);
        });
    }
}

module.exports = createFeaturedWorkController;
