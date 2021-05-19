$(document).ready(function () {
    $('#title').keyup(function () {
        var title = document.getElementById("title").value.trim();
        var oldtitle = document.getElementById("old-title").innerText.trim();

        if(title != oldtitle) {
            $.get('/get-check-featured-work', {title : title}, function(result) {
                //If a dupe was found
                if(result) {
                    $('#error').text('An instance with this title already exist your list');
                    $('#submit').prop('disabled', true);
                } else {
                    $('#error').text('');
                    $('#submit').prop('disabled', false);
                }
            }, ``);
        }
    });
});

function checkTitle() {
    var error = document.getElementById("error");
    var title = document.getElementById("title");
    if(title.value.trim() == "") {
        error.innerText = "Please enter a title.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkSynopsis() {
    var error = document.getElementById("error");
    var synopsis = document.getElementById("synopsis");
    if(synopsis.value.trim() == "") {
        error.innerText = "Please enter a synopsis.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkLink() {
    var error = document.getElementById("error");
    var link = document.getElementById("link");
    if(link.value.trim() == "") {
        error.innerText = "Please enter a source link.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkSubmit() {
    if(checkTitle() && checkSynopsis() && checkLink()) {
        return true;
    } else {
        return false;
    }
}
