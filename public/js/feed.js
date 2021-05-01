$(document).ready(function () {
    //remove custom feed
    $.get(`/check-status`, {}, function (result) {
        if (!result) { //not signed in
            document.getElementById(`custom-link`).remove();

            var customContent = document.getElementById(`custom`);
            customContent.classList.remove(`active`);

            //set hot
            var hotLink = document.getElementById(`hot-link`).getElementsByClassName(`nav-link`)[0];
            hotLink.classList.add(`active`);
            var hotContent = document.getElementById(`hot`);
            hotContent.classList.add(`active`);
        }
    });

    $.get(`/check-status`, {}, function (result) {
        if (result) { //signed in
            // display the votes of the user
            $.get(`/check-votes`, {}, function(result) {
                var types = [`custom`, `hot`, `new`];

                for (var i = 0; i < result.upvotes.length; i++) {
                    for (var j = 0; j < types.length; j++) {
                        var postID = types[j] + `post-` + result.upvotes[i]._id;
                        var post = document.getElementById(postID);
                        if (post) { //post is found
                            var upvote = post.getElementsByClassName(`upvote`)[0];

                            upvote.classList.remove(`btn-warning`);
                            upvote.classList.add(`btn-success`);
                        }
                    }
                }

                for (var i = 0; i < result.downvotes.length; i++) {
                    for (var j = 0; j < types.length; j++) {
                        var postID = types[j] + `post-` + result.downvotes[i]._id;
                        var post = document.getElementById(postID);
                        if (post) { //post is found
                            var downvote = post.getElementsByClassName(`downvote`)[0];

                            downvote.classList.remove(`btn-warning`);
                            downvote.classList.add(`btn-danger`);
                        }
                    }
                }
            });
        }
    });
});

function updateUpvote (postID) {
    var types = [`custom`, `hot`, `new`];

    $.get(`/update-upvote`, {postID: postID}, function (result) {

        for (var i = 0; i < types.length; i++) {
            var ID = types[i] + `post-` + postID;
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
        }
    });
}

function updateDownvote (postID) {

    var types = [`custom`, `hot`, `new`];

    $.get(`/update-downvote`, {postID: postID}, function(result) {
        for (var i = 0; i < types.length; i++) {
            var ID = types[i] + `post-` + postID;
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
        }
    });
}
