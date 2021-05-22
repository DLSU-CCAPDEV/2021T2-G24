function clicked(tab) {
    switch(tab) {
        case "general":
            clearStory();
            clearMedia();
            break;
        case "story":
            clearGeneral();
            clearMedia();
            break;
        case "media":
            clearGeneral();
            clearStory();
            break;
    }
}

/*
var username = document.getElementById("username");
if(username.value.trim() == "") {
    error.innerText = "Please enter your destined username."
    return false;
} else {
    error.innerText = ""
    return true;
}
*/

function checkGeneral() {
    var error = document.getElementById("error");
    var content = document.getElementById("genContent");
    if(content.value.trim() == "") {
        error.innerText = "Please enter a content for the general field.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkStory() {
    var error = document.getElementById("error");
    var plot = document.getElementById("plotContent");
    var char = document.getElementById("charContent");
    var setting = document.getElementById("settingContent");

    function checkPlot() {
        if(plot.value.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    function checkSetting() {
        if(setting.value.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    function checkCharacters() {
        if(char.value.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    if(checkPlot() || checkSetting() || checkCharacters()) {
        error.innerText = "";
        return true;
    } else {
        error.innerText = "Please enter content to at least one of the fields.";
        return false;
    }
}

function checkMedia() {
    var error = document.getElementById("error");
    var content = document.getElementById("media");
    if(content.value == "") {
        error.innerText = "Please upload a media content.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkTags() {
    var error = document.getElementById("error");
    var tag = document.getElementById("tags");
    if(tag.value.trim() == "") {
        error.innerText = "Please include at least one tag.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkTitle() {
    var error = document.getElementById("error");
    var title = document.getElementById("title");
    if(title.value.trim() == "") {
        error.innerText = "Please include a post title.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkSubmit() {
    var tab = document.getElementsByClassName("nav-link active")[0].id;
    if(checkTitle() && checkTags()) {
        switch(tab) {
            case "general-tab":
                return checkGeneral();
            case "story-tab":
                return checkStory();
            case "media-tab":
                return checkMedia();
        }
    } else {
        return false;
    }
}

function checkUpdate() {
    var content = document.getElementsByClassName("contents")[0].id;
    if(checkTitle() && checkTags()) {
        switch(content) {
            case "generalType":
                return checkGeneral();
            case "storyType":
                return checkStory();
            case "mediaType":
                return checkMedia();
        }
    } else {
        return false;
    }
}

function clearStory() {
    document.getElementById("plotContent").value = "";
    document.getElementById("charContent").value = "";
    document.getElementById("settingContent").value = "";
}

function clearGeneral() {
    document.getElementById("genContent").value = "";
}

function clearMedia() {
    document.getElementById("media").value = null;
}
