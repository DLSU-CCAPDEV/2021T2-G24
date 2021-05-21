const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);
var ObjectId = require(`mongodb`).ObjectID;

var postController = {

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;
                res.render(`post`);
            } else {
                // TODO: add page not found page?
            }
        });
    }
}

module.exports = postController;
