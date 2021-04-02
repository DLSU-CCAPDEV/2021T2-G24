function updateFollow (ID) {

    var user = document.getElementById(ID);
    var follow = user.getElementsByClassName("follow")[0];
    var status = follow.getElementsByTagName("span")[0];

    if (status.innerHTML == "Follow") { //follow
        status.innerHTML = "Following";
        follow.classList.remove("btn-dark");
        follow.classList.add("btn-outline-dark");
    } else { //unfollow
        status.innerHTML = "Follow";
        follow.classList.remove("btn-outline-dark");
        follow.classList.add("btn-dark");
    }
}
