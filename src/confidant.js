console.log("WORKING");

function getTabs() {
    console.log(browser.tabs.query({ currentWindow: true }));
}

document.addEventListener("DOMContentLoaded", getTabs);