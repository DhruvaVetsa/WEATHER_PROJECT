function changePath (url) {
    window.location.replace(url);
}

function showHideForm (element) {
    if (element.style.display == "inline") {
        element.style.display = "none";
    } else if (element.style.display == "none") {
        element.style.display = "inline";
    }
}