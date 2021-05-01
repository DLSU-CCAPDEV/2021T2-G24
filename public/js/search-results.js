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

            // display the followed tags and followed users of the user
            $.get(`/check-following`, {}, function(result) {
                //display followed users
                for (var i = 0; i < result.followed_users.length; i++) {
                    var ID = `user-` + result.followed_users[i];
                    var user = document.getElementById(ID);
                    if (user) { //user is found
                        var button = user.getElementsByClassName(`follow`)[0];
                        var status = button.getElementsByTagName(`span`)[0];

                        status.innerHTML = `<strong>Following</strong>`;
                        button.classList.remove(`btn-outline-warning`);
                        button.classList.add(`btn-warning`);
                    }
                }
                //display followed tags
                for (var i = 0; i < result.followed_tags.length; i++) {
                    var ID = 'tag-' + result.followed_tags[i];
                    var tag = document.getElementById(ID);
                    if (tag) {
                        var button = tag.getElementsByClassName(`follow`)[0];
                        var status = button.getElementsByTagName(`span`)[0];

                        status.innerHTML = `<strong>Following</strong>`;
                        button.classList.remove(`btn-outline-warning`);
                        button.classList.add(`btn-warning`);
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

function updateFollowedUsers (userID) {

    var ID = `user-` + userID;
    var tag = document.getElementById(ID);
    var button = tag.getElementsByClassName(`follow`)[0];
    var status = button.getElementsByTagName(`span`)[0];

    $.get(`/update-followed-users`, {userID: userID}, function(result) {
        if (result.following) { //currently following the tag
            //unfollow the tag
            status.innerHTML = `<strong>Follow</strong>`;
            button.classList.remove(`btn-warning`);
            button.classList.add(`btn-outline-warning`);
        } else {
            //follow the tag
            status.innerHTML = `<strong>Following</strong>`;
            button.classList.remove(`btn-outline-warning`);
            button.classList.add(`btn-warning`);
        }
    });
}

function updateFollowedTags (tagID) {

    var ID = `tag-` + tagID;
    var tag = document.getElementById(ID);
    var button = tag.getElementsByClassName(`follow`)[0];
    var status = button.getElementsByTagName(`span`)[0];

    $.get(`/update-followed-tags`, {tagID: tagID}, function(result) {
        if (result.following) { //currently following the tag
            //unfollow the tag
            status.innerHTML = `<strong>Follow</strong>`;
            button.classList.remove(`btn-warning`);
            button.classList.add(`btn-outline-warning`);
        } else {
            //follow the tag
            status.innerHTML = `<strong>Following</strong>`;
            button.classList.remove(`btn-outline-warning`);
            button.classList.add(`btn-warning`);
        }
    });
}
