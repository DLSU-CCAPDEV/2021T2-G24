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
    var error = document.getElementById("error-general");
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
    var error = document.getElementById("error-story");
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
    var error = document.getElementById("error-media");
    var content = document.getElementById("media");
    if(content.value == "") {
        error.innerText = "Please upload a media content.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkGenTags() {
    var error = document.getElementById("error-general");
    var tag = document.getElementById("tagsGeneral");
    if(tag.value.trim() == "") {
        error.innerText = "Please include at least one tag.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkGenTitle() {
    var error = document.getElementById("error-general");
    var title = document.getElementById("titleGeneral");
    if(title.value.trim() == "") {
        error.innerText = "Please include a post title.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkStoryTags() {
    var error = document.getElementById("error-story");
    var tag = document.getElementById("tagsStory");
    if(tag.value.trim() == "") {
        error.innerText = "Please include at least one tag.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkStoryTitle() {
    var error = document.getElementById("error-story");
    var title = document.getElementById("titleStory");
    if(title.value.trim() == "") {
        error.innerText = "Please include a post title.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkMediaTags() {
    var error = document.getElementById("error-media");
    var tag = document.getElementById("tagsMedia");
    if(tag.value.trim() == "") {
        error.innerText = "Please include at least one tag.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkMediaTitle() {
    var error = document.getElementById("error-media");
    var title = document.getElementById("titleMedia");
    if(title.value.trim() == "") {
        error.innerText = "Please include a post title.";
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}

function checkGeneralSubmit() {
    if(checkGeneralTitle() && checkGeneralTags()) {
        return checkGeneral();
    } else {
        return false;
    }
}

function checkStorySubmit() {
    if(checkStoryTitle() && checkStoryTags()) {
        return checkStory();
    } else {
        return false;
    }
}

function checkMediaSubmit() {
    if(checkMediaTitle() && checkMediaTags()) {
        return checkMedia();
    } else {
        return false;
    }
}

//For edit-post.js
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
    document.getElementById("titleStory").value = "";
    document.getElementById("tagsStory").value = "";
    document.getElementById("plotContent").value = "";
    document.getElementById("charContent").value = "";
    document.getElementById("settingContent").value = "";
}

function clearGeneral() {
    document.getElementById("titleGeneral").value = "";
    document.getElementById("tagsGeneral").value = "";
    document.getElementById("genContent").value = "";
}

function clearMedia() {
    document.getElementById("titleMedia").value = "";
    document.getElementById("tagsMedia").value = "";
    document.getElementById("media").value = null;
}
