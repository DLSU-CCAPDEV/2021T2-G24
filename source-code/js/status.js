function checkStatus () {

    if (localStorage.getItem("STATUS") == null) {
        localStorage.setItem("STATUS", "false");
    }

    if (localStorage.getItem("STATUS") == "true") { //signed in

        document.getElementsByTagName("nav")[0].innerHTML =
        `
        <a class="navbar-brand mr-auto" href="index.html">
            <img src="../../images/logo.png" alt="logo" style="width: 40px">
            <h3 class="d-inline align-middle" id="navbar-name">Writer's Kiln</h3>
        </a>

        <form class="form-inline ml-auto mr-auto" action="search-results.html" method="post">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search">
                <div class="input-group-prepend">
                    <button type="submit" class="btn btn-warning"><i class="fa fa-search"></i></button>
                    <button type="button" class="btn dropdown-toggle btn-outline-warning" data-toggle="dropdown"></button>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="advanced-search.html">Advanced Search</a>
                    </div>
                </div>
            </div>
        </form>

        <ul class="navbar-nav ml-auto">

            <li class="nav-item">
                <a href="feed.html" class="btn btn-warning" role="button"><i class="fa fa-home"></i></a>
            </li>
            <li class="nav-item">
                <div class="btn-group ml-auto">
                    <button type="button" class="btn btn-warning rounded ml-3" data-toggle="dropdown">
                        <span><i class="fa fa-user-circle-o"></i> H.P.Lovecraft</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="profile-1.html">My Profile</a>
                        <a class="dropdown-item" href="settings.html">Profile Settings</a>
                        <a class="dropdown-item" href="index.html" onclick="signOut()">Sign Out</a>
                    </div>
                </div>
            </li>
        </ul>
        `;
    } else {
        document.getElementsByTagName("nav")[0].innerHTML =
        `
        <a class="navbar-brand mr-auto" href="index.html">
            <img src="../../images/logo.png" alt="logo" style="width: 40px">
            <h3 class="d-inline align-middle" id="navbar-name">Writer's Kiln</h3>
        </a>

        <form class="form-inline ml-auto mr-auto" action="search-results.html" method="post">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search">
                <div class="input-group-prepend">
                    <button type="submit" class="btn btn-warning"><i class="fa fa-search"></i></button>
                    <button type="button" class="btn dropdown-toggle btn-outline-warning" data-toggle="dropdown"></button>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="advanced-search.html">Advanced Search</a>
                    </div>
                </div>
            </div>
        </form>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item mr-3">
                <a href="feed.html" class="btn btn-warning" role="button"><i class="fa fa-home"></i></a>
            </li>
            <li class="nav-item mr-3">
                <a href="sign-in.html" class="btn btn-warning" role="button">Sign In</a>
            </li>
            <li class="nav-item">
                <a href="sign-up.html" class="btn btn-warning" role="button">Sign Up</a>
            </li>
        </ul>
        `;
    }
}

function signIn () {
    localStorage.setItem("STATUS", "true");
}

function signOut () {
    localStorage.setItem("STATUS", "false");
}

function updateClickables () {

    if (localStorage.getItem("STATUS") == "false") { //visitor
        //change functionality of upvote
        var upvote = document.getElementsByClassName("upvote");
        for (var i = 0; i < upvote.length; i++) {
            upvote[i].removeAttribute("onclick");
            upvote[i].setAttribute("data-toggle", "modal");
            upvote[i].setAttribute("data-target", "#visitorModal");
        }

        //change functionality of downvote
        var downvote = document.getElementsByClassName("downvote");
        for (var i = 0; i < downvote.length; i++) {
            downvote[i].removeAttribute("onclick");
            downvote[i].setAttribute("data-toggle", "modal");
            downvote[i].setAttribute("data-target", "#visitorModal");
        }

        //change functionality of create buttons
        var create = document.getElementsByClassName("create");
        for (var i = 0; i < create.length; i++) {
            create[i].removeAttribute("onclick");
            create[i].setAttribute("data-toggle", "modal");
            create[i].setAttribute("data-target", "#visitorModal");
        }

        var follow = document.getElementsByClassName("follow");
        for (var i = 0; i < follow.length; i++) {
            follow[i].removeAttribute("onclick");
            follow[i].setAttribute("data-toggle", "modal");
            follow[i].setAttribute("data-target", "#visitorModal");

            follow[i].classList.remove("btn-warning");
            follow[i].classList.add("btn-outline-warning");
            follow[i].innerHTML = "<strong>Follow</strong>";
        }


        //modal
        var div = document.createElement("div");
        div.classList.add("modal", "fade");
        div.setAttribute("id", "visitorModal");
        div.innerHTML =
        `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Notice</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    You must sign in first before performing this operation.
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
        `;

        document.getElementsByTagName("body")[0].appendChild(div);

        var modify = document.getElementsByClassName("modify");

        while (modify.length > 0) {
            modify[0].remove();
        }
    }
}

function removeFollowSelf () {

    if (localStorage.getItem("STATUS") == "true") {
        var self = document.getElementsByClassName("follow-self");
        for (var i = 0; i < self.length; i++) {
            self[i].remove();
        }
    }
}

function removeCustom () {
    if (localStorage.getItem("STATUS") == "false") {
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
}
