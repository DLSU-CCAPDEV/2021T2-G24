$(document).ready(function () {

    $.get(`/check-status`, {}, function (result) {
        if (result) { //signed in
            // display the votes of the user
            $.get(`/check-votes`, {}, function(result) {
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
        }
    });
});

function updateUpvote (postID) {

    $.get(`/update-upvote`, {postID: postID}, function (result) {
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

function updateDownvote (postID) {

    $.get(`/update-downvote`, {postID: postID}, function(result) {
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

function deleteComment (commentID) {
    var comment = document.getElementById(commentID);
    var content = comment.getElementsByTagName("p")[0];
    content.classList.add("font-italic");
    content.innerHTML = "This comment has been deleted by the user";
}

function editComment (commentID) {

}
