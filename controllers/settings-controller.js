const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const ObjectId = require(`mongodb`).ObjectID;
const bcrypt = require(`bcryptjs`);
const saltRounds = 10;
const { validationResult } = require('express-validator');
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

var FeatWork = function(title, synopsis, image, url){
    this.title = title;
    this.synopsis = synopsis;
    this.image = image;
    this.url = url;
};

const settingsController = {
    getProfileSettings: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
            db.findOne(User, {username: res.locals.username}, function(result) {
                var user = result;
                res.render(`settings`, user);
            });
        }
    },

    uploadProfilePicture: function(req, res, next) {
        return upload.single('profile-picture')(req, res, function () {
            next();
        });
    },

    postProfileSettings: function(req, res) {
        // fetches validation errors
        var errors = validationResult(req);

        // if there are validation errors
        if (!errors.isEmpty()) {

            // get the array of errors
            errors = errors.errors;

            var details = {};

            if(errors.length > 0)
            details['error-pass'] = errors[0].msg

            res.render('settings', details);
        } else {
            var fullname = req.body.fullname;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.newpassword;
            var profile_picture = req.file;
            console.log(req.body.avatar);
            console.log(req.file);
            var about_me = req.body.about;
            var privacy = req.body.privacy;

            if(privacy == "true") {
                privacy = true;
            } else {
                privacy = false;
            }

            db.findOne(User, {_id: new ObjectId(req.session.userID)}, function(result) {
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(password == "") {
                        password = result.password;
                    } else {
                        password = hash;
                    }

                    if (profile_picture == null) {
                        profile_picture = result.profile_picture;
                    } else {
                        var img = fs.readFileSync(req.file.path);
                        var encode_image = img.toString('base64');

                        profile_picture = {
                            data: Buffer.from(encode_image, 'base64'),
                            contentType: req.file.mimetype
                        }
                    }

                    var update = {
                        $set: { fullname: fullname,
                            email: email,
                            username: username,
                            password: password,
                            profile_picture: profile_picture,
                            about_me: about_me,
                            privacy: privacy
                        }
                    }

                    db.updateOne(User, {username: req.session.username}, update, function(result) {
                        if(result) {
                            req.session.username = req.body.username;
                            res.redirect(`/profile/` + username);
                        }
                    });
                });
            });
        }
    },

    getCheckFeaturedWork: function(req, res) {
        // your code here
        var title = req.query.title;

        db.findOne(User, {username: req.session.username, "featured_works.title" : title}, function(result) {
            //Found a title dupe
            if(result) {
                res.send(true);
            }
            //No dupes
            else {
                res.send(false);
            }
        }, ``);
    },

    getCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-featured-work`);
    },

    uploadFeaturedImage: function(req, res, next) {
        return upload.single('featured-work')(req, res, function () {
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
                data: Buffer.from(fs.readFileSync(`public/images/blank.jpg`).toString('base64'), 'base64'),
                contentType: `image/jpeg`
            },
            url: req.body.link
        }

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
    },

    getEditFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        //Title
        var title = req.params.title;
        db.findOne (User, {username: res.locals.username}, function(result) {
            var featured_works = result.featured_works;
            var i;
            for(i = 0; i < featured_works.length; i++) {
                if(featured_works[i].title == title) {
                    res.locals.featured_work = featured_works[i];
                }
            }
            console.log(`Feat work: ` + res.locals.featured_work);
            res.render(`edit-featured-work`);
        }, ``);
        //res.render(`create-featured-work`);
    },

    postEditFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        //var featWork = new FeatWork(req.body.title, req.body.synopsis, req.body.thumbnail, req.body.link);

        console.log(`PARAMSTITLE IS : ` + req.params.title)
        db.updateOne(User, {username: req.session.username, "featured_works.title" : req.params.title},
        {$set: {"featured_works.$.title" : req.body.title,
        "featured_works.$.synopsis" : req.body.synopsis,
        "featured_works.$.url" : req.body.link,
        "featured_works.$.thumbnail" : req.body.thumbnail}}, function(){
            res.redirect(`/settings/`);
        });
    },

    getDeleteFeatured: function (req, res) {
        // your code here
        var username = req.session.username;
        var title = req.query.title;
        console.log(username);
        console.log(title);
        db.updateOne(User, {username: username}, {$pull: {featured_works: {title: title}}}, function(result){
            res.send(true);
        });
    },

    getAddFavorite: function(req, res) {
        // your code here
        var username = req.session.username;
        var favorite_work = req.query.favorite_work;

        db.updateOne(User, {username: username}, {$push: {favorite_works: favorite_work}}, function(result){
            res.send(favorite_work);
        });
    },

    getDeleteFavorite: function (req, res) {
        // your code here
        var username = req.session.username;
        var title = req.query.title;
        console.log(username);
        console.log(title);
        db.updateOne(User, {username: username}, {$pull: {favorite_works: title}}, function(result){
            res.send(true);
        });
    }
}

module.exports = settingsController;
