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
        default: new Date()
    },
    tags: {
        type: Array,
        required: true
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
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    },
    upvotes: {
        type: Array
    },
    downvotes: {
        type: Array
    },
    comments: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', PostSchema);
