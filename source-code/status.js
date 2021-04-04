function checkStatus () {

    if (localStorage.getItem("STATUS") == null) {
        localStorage.setItem("STATUS", "false");
    }

    if (localStorage.getItem("STATUS") == "true") {

        document.getElementsByTagName("nav")[0].innerHTML =
        `
        <a class="navbar-brand mr-auto" href="index.html">
            <img src="../images/logo.png" alt="logo" style="width: 40px">
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
                        <a class="dropdown-item" href="profile.html">My Profile</a>
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
            <img src="../images/logo.png" alt="logo" style="width: 40px">
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
