$(document).ready(function () {
    //Username
    $('#username').keyup(function () {
        var username = document.getElementById("username").value.trim();
        $.get('/get-check-username', {username : username}, function(result) {
            //If a dupe was found
            if(result) {
                $('#error-user').text('Username is already taken');
                $('#submit').prop('disabled', true);
            } else {
                $('#error-user').text('');
                $('#submit').prop('disabled', false);
            }
        }, ``);
    });

    var privacy = document.getElementById("privacy");
    if(privacy.value == "true") {
        privacy.checked = true;
    } else {
        privacy.checked = false;
    }

});

function checkPassword() {
    var newPass = document.getElementById("newpassword").value;
    var reenterPass = document.getElementById("reenterpassword").value;
    //If matched
    if(newPass == reenterPass) {
        $('#error-pass').text('');
        return true;
    } else {
        $('#error-pass').text('The passwords entered are not matching');
        return false;
    }
}

function checkAbout() {
    var about = document.getElementById("about");
    if(about.value.trim() == "") {
        about.value = "The user has yet to add an introduction";
    }
}

function checkPrivacy() {
    var privacy = document.getElementById("privacy");
    if(privacy.checked) {
        privacy.value = "true";
    } else {
        privacy.value = "false";
    }
}

function checkFullname() {
    var fullname = document.getElementById("fullname");
    var error = document.getElementById("error-pass");
    if(fullname.value.trim() == "") {
        error.innerText = "Fullname can't be empty"
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkEmail() {
    var email = document.getElementById("email");
    var error = document.getElementById("error-pass");
    if(email.value.trim() == "") {
        error.innerText = "Email address can't be empty"
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function verifyEmail() {
    var email = document.getElementById("email");
    var error = document.getElementById("error-pass");
    if(!(validator.isEmail(email.value.trim()))) {
        error.innerText = "Please enter a valid email address"
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkUsername() {
    var username = document.getElementById("username");
    var error = document.getElementById("error-pass");
    if(username.value.trim() == "") {
        error.innerText = "Username can't be empty"
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkSubmit() {
    if(checkFullname() && checkEmail() && verifyEmail() && checkUsername() && checkPassword()) {
        checkAbout();
        checkPrivacy();
        return true;
    } else {
        return false;
    }
}


function checkFavDupe(title) {
    var works = document.getElementsByClassName("favorite_work");
    var i;

    for(i = 0; i < works.length; i++) {
        //If a duplicate is found
        if(title.trim() == works[i].innerText.trim())
            return true;
    }
    return false;
}

function removeFav (favId, favTitle) {
    //Div
    var fav = document.getElementById(favId);
    var title = favTitle.slice(10);

    $.get('/delete-favorite', {title: title}, function(result) {
        fav.remove();
    });
}

function addFav() {
    var fav = $("#newFav").val().trim();
    var error = $("#error");

    //if empty
    if(fav == "") {
        error.html("Please fill up a valid title");
    } else {
        //if there's a duplicate
        if(checkFavDupe(fav)) {
            error.html("An instance of work with this title already exist in your list");
        } else {
            error.html("");
            $.get('/add-favorite', {favorite_work: fav}, function(result) {
                /**********THE CHANGE IN THE FRONT END**********/
                var fav = document.getElementById("fav-add");
                var input = fav.getElementsByTagName("input")[0].value;

                var favWorksDiv = document.getElementById("fav-works");

                // div
                var div = document.createElement("div");
                div.classList.add("d-flex", "border-bottom", "align-items-center", "justify-content-between", "fav-works"); //class
                var favWorks = document.getElementsByClassName("fav-works");
                var id = document.createAttribute("id");
                id.value = "fav-" + result;
                div.setAttributeNode(id);

                // h6
                var h6 = document.createElement("h6");
                var idTitle = document.createAttribute("id");
                idTitle.value = "fav-title-" + result;
                h6.classList.add("m-3");
                h6.classList.add("favorite_work")
                h6.innerHTML = input;
                h6.setAttributeNode(idTitle);
                div.appendChild(h6);

                //button
                var button = document.createElement("button");
                var type = document.createAttribute("type"); //type
                type.value = "button";
                button.setAttributeNode(type);
                button.classList.add("btn", "btn-outline-danger", "rounded-circle", "m-2"); //class
                var onclick = document.createAttribute("onclick"); //onclick
                onclick.value = "removeFav('fav-" + result + "', 'fav-title-" + result + "')";
                button.setAttributeNode(onclick);
                var i = document.createElement("i"); // i
                i.classList.add("fa", "fa-times")
                button.appendChild(i);
                div.appendChild(button);

                favWorksDiv.insertBefore(div, favWorks[favWorks.length - 1]);
                fav.getElementsByTagName("input")[0].value = "";
                //Clear
            });
        }
    }
}

function removeFeat(featID) {
    //Div
    var feat = document.getElementById(featID);
    var title = featID.slice(5);

    $.get('/delete-featured', {title: title}, function(result) {
        feat.remove();
    });
}
