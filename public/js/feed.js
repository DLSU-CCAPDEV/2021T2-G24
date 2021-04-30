$(document).ready(function () {
    $.get(`/check-status`, {}, function (result) {
        if (!result) { //not signed in
            //remove custom
            document.getElementById("custom-link").remove();

            var customContent = document.getElementById("custom");
            customContent.classList.remove("active");

            //set hot
            var hotLink = document.getElementById("hot-link").getElementsByClassName("nav-link")[0];
            hotLink.classList.add("active");
            var hotContent = document.getElementById("hot");
            hotContent.classList.add("active");
        }
    });
});

function updateUpvote (postID) {
    var post = document.getElementById(postID);
    var upvote = post.getElementsByClassName("upvote")[0];
    var upvoteCount = upvote.getElementsByTagName("span")[0];
    var downvote = post.getElementsByClassName("downvote")[0];
    var downvoteCount = downvote.getElementsByTagName("span")[0];

    var pos = postID.lastIndexOf(`-`);
    var ID = postID.slice(pos + 1, postID.length);
    $.get('/update-upvote', {postID: ID});

    if (upvote.classList.contains("btn-success")) { //upvote is activated
        //decrease upvote counter
        upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
        upvote.classList.remove("btn-success");
        upvote.classList.add("btn-warning");
    } else { //upvote is not activated
        if (downvote.classList.contains("btn-danger")) { //downvote is activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.classList.remove("btn-warning");
            upvote.classList.add("btn-success");

            //decrease downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
            downvote.classList.remove("btn-danger");
            downvote.classList.add("btn-warning");
        } else { //downvote is not activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.classList.remove("btn-warning");
            upvote.classList.add("btn-success");
        }
    }
}

function updateDownvote (postID) {

    var post = document.getElementById(postID);
    var upvote = post.getElementsByClassName("upvote")[0];
    var upvoteCount = upvote.getElementsByTagName("span")[0];
    var downvote = post.getElementsByClassName("downvote")[0];
    var downvoteCount = downvote.getElementsByTagName("span")[0];

    var pos = postID.lastIndexOf(`-`);
    var ID = postID.slice(pos + 1, postID.length);
    $.get('/update-downvote', {postID: ID});

    if (downvote.classList.contains("btn-danger")) { //downvote is activated
        //decrease downvote counter
        downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
        downvote.classList.remove("btn-danger");
        downvote.classList.add("btn-warning");
    } else { //downvote is not activated
        if (upvote.classList.contains("btn-success")) { //upvote is activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.classList.remove("btn-warning");
            downvote.classList.add("btn-danger");

            //decrease upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
            upvote.classList.remove("btn-success");
            upvote.classList.add("btn-warning");
        } else { //upvote is not activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.classList.remove("btn-warning");
            downvote.classList.add("btn-danger");
        }
    }
}
