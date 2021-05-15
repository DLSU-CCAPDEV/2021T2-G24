var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tags: {
        type: Array
    },
    general: {
        type: String
    },
    plot: {
        type: String
    },
    characters: {
        type: String
    },
    setting: {
        type: String
    },
    media: {
        type: String
    },
    upvotes: {
        type: Array
    },
    downvotes: {
        type: Array
    },
    comments: {
        type: Number
    }
});

module.exports = mongoose.model('Post', PostSchema);
