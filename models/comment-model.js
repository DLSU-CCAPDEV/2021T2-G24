var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({

    postID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
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
