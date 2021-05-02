$(document).ready(function () {

    $.get(`/check-status`, {}, function (result) {
        if (result) { //signed in
            var path = window.location.pathname;
            var index = path.lastIndexOf("/");
            var postID = path.slice(index + 1, path.length);

            // display the post vote of the user
            $.get(`/check-post-votes`, {postID: postID}, function(result) {
                for (var i = 0; i < result.upvotes.length; i++) {
                    var postID = `post-` + result.upvotes[i]._id;
                    var post = document.getElementById(postID);
                    if (post) { //post is found
                        var upvote = post.getElementsByClassName(`upvote`)[0];

                        upvote.classList.remove(`btn-warning`);
                        upvote.classList.add(`btn-success`);
                    }
                }

                for (var i = 0; i < result.downvotes.length; i++) {
                    var postID = `post-` + result.downvotes[i]._id;
                    var post = document.getElementById(postID);
                    if (post) { //post is found
                        var downvote = post.getElementsByClassName(`downvote`)[0];

                        downvote.classList.remove(`btn-warning`);
                        downvote.classList.add(`btn-danger`);
                    }
                }
            });

            //display the comment votes of the user
            $.get(`/check-comment-votes`, {postID: postID}, function(result) {
                for (var i = 0; i < result.upvotes.length; i++) {
                    var commentID = `comment-` + result.upvotes[i]._id;
                    var comment = document.getElementById(commentID);
                    if (comment) { //comment is found
                        var upvote = comment.getElementsByClassName(`upvote`)[0];

                        upvote.classList.remove(`btn-warning`);
                        upvote.classList.add(`btn-success`);
                    }
                }

                for (var i = 0; i < result.downvotes.length; i++) {
                    var commentID = `comment-` + result.downvotes[i]._id;
                    var comment = document.getElementById(commentID);
                    if (comment) { //comment is found
                        var downvote = comment.getElementsByClassName(`downvote`)[0];

                        downvote.classList.remove(`btn-warning`);
                        downvote.classList.add(`btn-danger`);
                    }
                }
            });
        }
    });
});

function updatePostUpvote (postID) {

    $.get(`/update-post-upvote`, {postID: postID}, function (result) {
        var ID = `post-` + postID;
        var post = document.getElementById(ID);
        if (post) { //post is found
            var upvote = post.getElementsByClassName(`upvote`)[0];
            var upvoteCount = upvote.getElementsByTagName(`span`)[0];
            var downvote = post.getElementsByClassName(`downvote`)[0];
            var downvoteCount = downvote.getElementsByTagName(`span`)[0];

            if (result.upvote) { //upvote is activated
                //decrease upvote counter
                upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
                upvote.classList.remove(`btn-success`);
                upvote.classList.add(`btn-warning`);
            } else { //upvote is not activated
                if (result.downvote) { //downvote is activated
                    //increase upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
                    upvote.classList.remove(`btn-warning`);
                    upvote.classList.add(`btn-success`);

                    //decrease downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
                    downvote.classList.remove(`btn-danger`);
                    downvote.classList.add(`btn-warning`);
                } else { //downvote is not activated
                    //increase upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
                    upvote.classList.remove(`btn-warning`);
                    upvote.classList.add(`btn-success`);
                }
            }
        }
    });
}

function updatePostDownvote (postID) {

    $.get(`/update-post-downvote`, {postID: postID}, function(result) {
        var ID = `post-` + postID;
        var post = document.getElementById(ID);
        if (post) { //post is found
            var upvote = post.getElementsByClassName(`upvote`)[0];
            var upvoteCount = upvote.getElementsByTagName(`span`)[0];
            var downvote = post.getElementsByClassName(`downvote`)[0];
            var downvoteCount = downvote.getElementsByTagName(`span`)[0];

            if (result.downvote) { //downvote is activated
                //decrease downvote counter
                downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
                downvote.classList.remove(`btn-danger`);
                downvote.classList.add(`btn-warning`);
            } else { //downvote is not activated
                if (result.upvote) { //upvote is activated
                    //increase downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
                    downvote.classList.remove(`btn-warning`);
                    downvote.classList.add(`btn-danger`);

                    //decrease upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
                    upvote.classList.remove(`btn-success`);
                    upvote.classList.add(`btn-warning`);
                } else { //upvote is not activated
                    //increase downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
                    downvote.classList.remove(`btn-warning`);
                    downvote.classList.add(`btn-danger`);
                }
            }
        }
    });
}

function updateCommentUpvote (commentID) {

    $.get(`/update-comment-upvote`, {commentID: commentID}, function (result) {
        var ID = `comment-` + commentID;
        var comment = document.getElementById(ID);
        if (comment) { //comment is found
            var upvote = comment.getElementsByClassName(`upvote`)[0];
            var upvoteCount = upvote.getElementsByTagName(`span`)[0];
            var downvote = comment.getElementsByClassName(`downvote`)[0];
            var downvoteCount = downvote.getElementsByTagName(`span`)[0];

            if (result.upvote) { //upvote is activated
                //decrease upvote counter
                upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
                upvote.classList.remove(`btn-success`);
                upvote.classList.add(`btn-warning`);
            } else { //upvote is not activated
                if (result.downvote) { //downvote is activated
                    //increase upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
                    upvote.classList.remove(`btn-warning`);
                    upvote.classList.add(`btn-success`);

                    //decrease downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
                    downvote.classList.remove(`btn-danger`);
                    downvote.classList.add(`btn-warning`);
                } else { //downvote is not activated
                    //increase upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
                    upvote.classList.remove(`btn-warning`);
                    upvote.classList.add(`btn-success`);
                }
            }
        }
    });
}

function updateCommentDownvote (commentID) {

    $.get(`/update-comment-downvote`, {commentID: commentID}, function(result) {
        var ID = `comment-` + commentID;
        var comment = document.getElementById(ID);
        if (comment) { //comment is found
            var upvote = comment.getElementsByClassName(`upvote`)[0];
            var upvoteCount = upvote.getElementsByTagName(`span`)[0];
            var downvote = comment.getElementsByClassName(`downvote`)[0];
            var downvoteCount = downvote.getElementsByTagName(`span`)[0];

            if (result.downvote) { //downvote is activated
                //decrease downvote counter
                downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
                downvote.classList.remove(`btn-danger`);
                downvote.classList.add(`btn-warning`);
            } else { //downvote is not activated
                if (result.upvote) { //upvote is activated
                    //increase downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
                    downvote.classList.remove(`btn-warning`);
                    downvote.classList.add(`btn-danger`);

                    //decrease upvote counter
                    upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
                    upvote.classList.remove(`btn-success`);
                    upvote.classList.add(`btn-warning`);
                } else { //upvote is not activated
                    //increase downvote counter
                    downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
                    downvote.classList.remove(`btn-warning`);
                    downvote.classList.add(`btn-danger`);
                }
            }
        }
    });
}

function deleteComment (commentID) {

    var path = window.location.pathname;
    var index = path.lastIndexOf("/");
    var postID = path.slice(index + 1, path.length);

    $.post(`/delete-comment`, {postID: postID, commentID: commentID}, function (result) {

        if (result.deleted) {
            var comment = document.getElementById(`comment-` + commentID);
            comment.remove();

            var postComment = document.getElementById(`post-comment`);
            var commentCount = postComment.getElementsByTagName(`span`)[0];
            commentCount.innerHTML = parseInt(commentCount.innerHTML) - 1;

        }
    });
}
