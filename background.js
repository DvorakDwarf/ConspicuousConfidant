function getTabs() {
    console.log(browser.tabs.query({ currentWindow: true }));
}

document.addEventListener("DOMContentLoaded", getTabs);

browser.runtime.onMessage.addListener((data, sender) => {
    if (data.type === "switch_tab") {
        console.log("Switching tabs");

        browser.tabs.query();
        return Promise.resolve("done");
    }
    return false;
});

function logTabs(tabs) {
    for (const tab of tabs) {
        // tab.url requires the `tabs` permission or a matching host permission.
        console.log(tab.url);
    }
}
  
function onError(error) {
    console.error(`Error: ${error}`);
}
  
browser.tabs.query({}).then(logTabs, onError);

console.log("BACKGROUND LOADED")