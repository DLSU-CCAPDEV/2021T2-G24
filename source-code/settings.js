function removeFav (favID) {
    var fav = document.getElementById(favID);
    fav.remove();
}

function addFav () {

    var fav = document.getElementById("fav-add");
    var input = fav.getElementsByTagName("input")[0].value;

    var favWorksDiv = document.getElementById("fav-works");
    // div
    var div = document.createElement("div");
    div.classList.add("d-flex", "border-bottom", "align-items-center", "justify-content-between", "fav-works"); //class
    var favWorks = document.getElementsByClassName("fav-works");
    var id = document.createAttribute("id");
    id.value = "" + favWorks.length;
    div.setAttributeNode(id);
    // h6
    var h6 = document.createElement("h6");
    h6.classList.add("m-3");
    h6.innerHTML = input;
    div.appendChild(h6);
    //button
    var button = document.createElement("button");
    var type = document.createAttribute("type"); //type
    type.value = "button";
    button.setAttributeNode(type);
    button.classList.add("btn", "btn-outline-danger", "rounded-circle", "m-2"); //class
    var onclick = document.createAttribute("onclick"); //onclick
    onclick.value = "removeFav('" + id.value + "')";
    button.setAttributeNode(onclick);
    var i = document.createElement("i"); // i
    i.classList.add("fa", "fa-times")
    button.appendChild(i);
    div.appendChild(button);
    favWorksDiv.insertBefore(div, favWorks[favWorks.length - 1]);
    fav.getElementsByTagName("input")[0].value = "";
}

function removeFeat(featID) {
    var feat = document.getElementById(featID);
    feat.remove();
}
