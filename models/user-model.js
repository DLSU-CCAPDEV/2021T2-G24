var mongoose = require('mongoose');
var fs = require(`fs`);

var UserSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile_picture: {
        data: {
            type: Buffer,
            default: new Buffer(fs.readFileSync(`public/images/default-profile-picture.jpg`).toString('base64'), 'base64')
        },
        contentType: {
            type: String,
            default: `image/jpeg`
        }
    },
    password: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        default: "The user has yet to add an introduction"
    },
    followed_users: {
        type: Array
    },
    followed_tags: {
        type: Array
    },
    featured_works: {
        type: Array
    },
    favorite_works: {
        type: Array
    },
    privacy: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', UserSchema);
