var mongoose = require('mongoose');

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
    password: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        default: ""
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
    }

});

module.exports = mongoose.model('User', UserSchema);
