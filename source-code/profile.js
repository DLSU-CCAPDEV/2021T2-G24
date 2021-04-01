function updateFollow (userID) {

    var user = document.getElementById(userID);
    var follow = user.getElementsByClassName("follow")[0];
    var status = follow.getElementsByTagName("span")[0];

    if (status.innerHTML == "Follow") {
        status.innerHTML = "Following";
        status.style.backgroundColor = "#343a40";
        status.style.color = "#f8f9fa";
    } else {
        status.innerHTML = "Follow";
        status.style.backgroundColor = "#f8f9fa";
        status.style.color = "#343a40";
    }
}
