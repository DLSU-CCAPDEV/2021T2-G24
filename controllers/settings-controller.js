const User = require(`../models/user-model.js`);
const bcrypt = require(`bcryptjs`);
const db = require(`../models/db.js`);
const saltRounds = 10;

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

    postProfileSettings: function(req, res) {
        var fullname = req.body.fullname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.newpassword;
        var about_me = req.body.about;
        var privacy = req.body.privacy;

        if(privacy == "true") {
            privacy = true;
        } else {
            privacy = false;
        }

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(password == "") {
                password = req.session.password;
            } else {
                password = hash;
            }

            db.updateOne(User, {username: req.session.username},
                {$set: {fullname: fullname,
                        email: email,
                        username: username,
                        password: password,
                        about_me: about_me,
                        privacy: privacy}}, function(result) {
                if(result) {
                    res.redirect(`/profile/` + username);
                }
            });
        });
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

    postCreateFeatured: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        var featWork = new FeatWork(req.body.title, req.body.synopsis, req.body.thumbnail, req.body.link);

        db.updateOne(User, {username: req.session.username}, {$push: {featured_works : featWork}}, function(){
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
