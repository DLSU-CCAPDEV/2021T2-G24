function updateUpvote (postID) {
    var post = document.getElementById(postID);
    var upvote = post.getElementsByClassName("upvote")[0];
    var upvoteCount = upvote.getElementsByTagName("span")[0];
    var downvote = post.getElementsByClassName("downvote")[0];
    var downvoteCount = downvote.getElementsByTagName("span")[0];

    if (upvote.classList.contains("btn-success")) { //upvote is activated
        //decrease upvote counter
        upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
        upvote.classList.remove("btn-success");
        upvote.classList.add("btn-dark");
    } else { //upvote is not activated
        if (downvote.classList.contains("btn-danger")) { //downvote is activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.classList.remove("btn-dark");
            upvote.classList.add("btn-success");

            //decrease downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
            downvote.classList.remove("btn-danger");
            downvote.classList.add("btn-dark");
        } else { //downvote is not activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.classList.remove("btn-dark");
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

    if (downvote.classList.contains("btn-danger")) { //downvote is activated
        //decrease downvote counter
        downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
        downvote.classList.remove("btn-danger");
        downvote.classList.add("btn-dark");
    } else { //downvote is not activated
        if (upvote.classList.contains("btn-success")) { //upvote is activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.classList.remove("btn-dark");
            downvote.classList.add("btn-danger");

            //decrease upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
            upvote.classList.remove("btn-success");
            upvote.classList.add("btn-dark");
        } else { //upvote is not activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.classList.remove("btn-dark");
            downvote.classList.add("btn-danger");
        }
    }
}
