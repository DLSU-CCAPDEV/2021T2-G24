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

function clearStory() {
    document.getElementById("plotContent").value = "";
    document.getElementById("charContent").value = "";
    document.getElementById("settingContent").value = "";
}

function clearGeneral() {
    document.getElementById("genContent").value = "";
}

function clearMedia() {
    document.getElementById("thumbnail").value = "";
}
