$(document).ready(function () {
    //Username
    $('#username').keyup(function () {
        var username = document.getElementById("username").value.trim();
        $.get('/get-check-username', {username : username}, function(result) {
            //If a dupe was found
            if(result) {
                $('#error').text('Username is already taken');
                $('#submit').prop('disabled', true);
            } else {
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        }, ``);
    });

});

function checkTerms() {
    var term = document.getElementById("terms");
    var error = document.getElementById("error");
    if(term.checked) {
        error.innerText = "";
        return true;
    } else {
        error.innerText = "You must accept the Terms and Conditions before using Writer's Kiln";
        return false;
    }
}

function checkEmail() {
    var email = document.getElementById("email");
    if(email.value.trim() == "") {
        error.innerText = "Please enter your email address."
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function verifyEmail() {
    var email = document.getElementById("email");
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
    if(username.value.trim() == "") {
        error.innerText = "Please enter your destined username."
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkFullname() {
    var fullname = document.getElementById("fullname");
    if(fullname.value.trim() == "") {
        error.innerText = "Please enter your fullname."
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkPassword() {
    var password = document.getElementById("password");
    if(password.value.trim() == "") {
        error.innerText = "Please enter a password."
        return false;
    } else {
        error.innerText = ""
        return true;
    }
}

function checkSubmit() {
    if(checkEmail() && verifyEmail() && checkUsername() && checkFullname() && checkPassword() && checkTerms()) {
        return true;
    } else {
        return false;
    }
}
