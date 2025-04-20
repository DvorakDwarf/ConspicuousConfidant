console.log("BACKGROUND START");

browser.storage.local.set({"whitelist": [
    "stackoverflow.com", 
    "docs.python.org", 
    "wikipedia.org",
    "github.com"
]});
browser.storage.local.set({"wait_time": 1000 * 10});
browser.storage.local.set({"troll_time": 1000 * 5});
browser.storage.local.set({"enabled": true}); //TODO: CHANGE THIS BACK TO FALSE

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStorage") {
        browser.storage.local.get([request.key], (result) => {
            sendResponse({ data: result[request.key] });
        });
            return true; // Required for async response
    }
    
    if (request.action === "setStorage") {
        browser.storage.local.set({ [request.key]: request.value }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
    if (request.action === "activate") {
        // Update both timer parameters at once
        const updates = {
            troll_time: request.value.timeToTroll*60000,
            wait_time: request.value.timeToSwitch*60000,
            enabled: request.value.isActive
        };
        
        browser.storage.local.set(updates, () => {
            sendResponse({ success: true });
        });
        return true;
    }
    // Add other actions as needed
  });

async function pickTab(tabs) {
    const whitelist = (await browser.storage.local.get("whitelist")).whitelist;

    const productiveTabs = tabs.filter((tab) => {
        const hostname = (new URL(tab.url)).hostname;
        return whitelist.includes(hostname);
    })

    if (productiveTabs.length == 0) {
        return;
    }

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