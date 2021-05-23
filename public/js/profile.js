$(document).ready(function () {

    $.get(`/check-status`, {}, function (result) {
        if (result) { //signed in

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

function updateFollowedUsers (username) {

    var ID = `user-` + username;
    var tag = document.getElementById(ID);
    var button = tag.getElementsByClassName(`follow`)[0];
    var status = button.getElementsByTagName(`span`)[0];

    $.get(`/update-followed-users`, {username: username}, function(result) {
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
