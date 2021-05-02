function checkSubmit() {
    var comment = document.getElementById("comment");
    if(comment.value.trim() == "") {
        error.innerText = "Please enter a comment.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}
