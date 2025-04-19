//Things we store
// An array of allowed URLs
// Enabled or disabled

// browser.storage.local.set({"whitelist": ["stackoverflow.com"]});
// browser.storage.local.set({"enabled": false});

async function pickTab(tabs) {
    const whitelist = (await browser.storage.local.get("whitelist")).whitelist;

    const productiveTabs = tabs.filter((tab) => {
        const hostname = (new URL(tab.url)).hostname;
        return whitelist.includes(hostname);
    })
    const randomTab = productiveTabs[Math.floor(Math.random() * productiveTabs.length)];

    browser.tabs.query({
        currentWindow: true
    }).then((tabs) => {
        for (let tab of tabs) {
            if (tab.id === randomTab.id) {
                browser.tabs.update(randomTab.id, {
                    active: true
                });

                break;
            }
        }
    });
}
  
function onError(error) {
    console.error(`Error: ${error}`);
}

browser.runtime.onMessage.addListener((data, sender) => {
    if (data.command === "switch_tab") {
        console.log("Switching tabs");

        browser.tabs.query({}).then(pickTab, onError);
        return Promise.resolve("done");
    }
    return false;
});

// console.log("BACKGROUND LOADED")
// Listen for storage requests
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStorage") {
      return browser.storage.local.get(request.key)
        .then(result => ({ data: result[request.key] }));
    }
    
    if (request.action === "setStorage") {
      return browser.storage.local.set({ [request.key]: request.value })
        .then(() => ({ success: true }));
    }
  });