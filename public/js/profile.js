function updateFollow (ID) {

    var user = document.getElementById(ID);
    var follow = user.getElementsByClassName("follow")[0];
    var status = follow.getElementsByTagName("span")[0];

    if (status.innerHTML == "<strong>Follow</strong>") { //follow
        status.innerHTML = "<strong>Following</strong>";
        follow.classList.remove("btn-outline-warning");
        follow.classList.add("btn-warning");
    } else { //unfollow
        status.innerHTML = "<strong>Follow</strong>";
        follow.classList.remove("btn-warning");
        follow.classList.add("btn-outline-warning");
    }
}
