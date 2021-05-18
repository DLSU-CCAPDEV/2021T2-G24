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
    var username = document.getElementById("username").value;
    var title = favTitle.slice(10);

    var update = {
        username: username,
        title: title
    }

    $.get('/delete-favorite', update, function(result) {
        fav.remove();
    });
}

function addFav() {
    var fav = $("#newFav").val().trim();
    var username = $("#username").val();
    var error = $("#error");

    //if empty
    if(fav == "") {
        error.html("Please fill up a valid title");
    } else {
        var update = {
            username: username,
            favorite_work: fav
        }
        //if there's a duplicate
        if(checkFavDupe(fav)) {
            error.html("An instance of work with this title already exist in your list");
        } else {
            error.html("");
            $.get('/add-favorite', update, function(result) {
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
    var feat = document.getElementById(featID);
    feat.remove();
}
