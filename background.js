//Things we store
// An array of allowed URLs
// Enabled or disabled

browser.storage.local.set({"whitelist": ["stackoverflow.com"]});
browser.storage.local.set({"enabled": false});

function pickTab(tabs) {
    for (const tab of tabs) {
        // tab.url requires the `tabs` permission or a matching host permission.
        console.log(tab.url);
    }
}
  
function onError(error) {
    console.error(`Error: ${error}`);
}

browser.runtime.onMessage.addListener((data, sender) => {
    if (data.type === "switch_tab") {
        console.log("Switching tabs");

        browser.tabs.query({}).then(pickTab, onError);
        return Promise.resolve("done");
    }
    return false;
});

console.log("BACKGROUND LOADED")