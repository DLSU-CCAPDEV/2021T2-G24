var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({

    postID: {
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
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Array
    },
    downvotes: {
        type: Array
    }

});

module.exports = mongoose.model('Comment', CommentSchema);
