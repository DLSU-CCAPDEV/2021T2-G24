function increaseUpvote (postID) {
    var post = document.getElementById(postID);
    var upvote = post.getElementsByClassName("upvote")[0];
    var upvoteCount = upvote.getElementsByTagName("span")[0];
    var downvote = post.getElementsByClassName("downvote")[0];
    var downvoteCount = downvote.getElementsByTagName("span")[0];

    if (upvote.style.backgroundColor == "green" && upvote.style.borderColor == "green") { //upvote is activated
        //decrease upvote counter
        upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
        upvote.style.backgroundColor = "#343a40";
        upvote.style.borderColor = "#343a40";
    } else { //upvote is not activated
        if (downvote.style.backgroundColor == "red" && downvote.style.borderColor == "red") { //downvote is activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.style.backgroundColor = "green";
            upvote.style.borderColor = "green";

            //decrease downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
            downvote.style.backgroundColor = "#343a40";
            downvote.style.borderColor = "#343a40";
        } else { //downvote is not activated
            //increase upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) + 1;
            upvote.style.backgroundColor = "green";
            upvote.style.borderColor = "green";
        }
    }
}

function increaseDownvote (postID) {

    var post = document.getElementById(postID);
    var upvote = post.getElementsByClassName("upvote")[0];
    var upvoteCount = upvote.getElementsByTagName("span")[0];
    var downvote = post.getElementsByClassName("downvote")[0];
    var downvoteCount = downvote.getElementsByTagName("span")[0];

    if (downvote.style.backgroundColor == "red" && downvote.style.borderColor == "red") { //downvote is activated
        //decrease upvote counter
        downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) - 1;
        downvote.style.backgroundColor = "#343a40";
        downvote.style.borderColor = "#343a40";
    } else { //downvote is not activated
        if (upvote.style.backgroundColor == "green" && upvote.style.borderColor == "green") { //upvote is activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.style.backgroundColor = "red";
            downvote.style.borderColor = "red";

            //decrease upvote counter
            upvoteCount.innerHTML = parseInt(upvoteCount.innerHTML) - 1;
            upvote.style.backgroundColor = "#343a40";
            upvote.style.borderColor = "#343a40";
        } else { //upvote is not activated
            //increase downvote counter
            downvoteCount.innerHTML = parseInt(downvoteCount.innerHTML) + 1;
            downvote.style.backgroundColor = "red";
            downvote.style.borderColor = "red";
        }
    }
}
