// Initialize storage with chrome API
chrome.storage.local.set({
    "whitelist": ["stackoverflow.com"],
  });

chrome.storage.local.set({

    "wait_time": 1000 * 5,
})
chrome.storage.local.set({

    "troll_time": 1000 * 1,
})

chrome.storage.local.set({

    "enabled": true
})
//   chrome.storage.local.get("enabled").then(console.log())
//   console.log(chrome.storage.local.get("enabled"));
  console.log("CONSOLE LOG")

  const getEnabled = async () => {
    const enabled = (await chrome.storage.local.get("enabled"));
    console.log(enabled);
  }
  console.log(chrome.storage)

  getEnabled()
//   // Single message listener for all requests
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // Handle storage requests
//     // if (request.action === "getStorage") {
//     //   chrome.storage.local.get(request.key, (result) => {
//     //     sendResponse({ data: result[request.key] });
//     //     console.log(result)
//     //   });
//     //   return true; // Required for async response
//     // }
    
//     if (request.action === "setStorage") {
//       chrome.storage.local.set({ [request.key]: request.value }, () => {
//         sendResponse({ success: true });
//       });
//       return true;
//     }
    
//     // Handle tab switching command
//     // if (request.command === "switch_tab") {
//     //   console.log("Switching tabs");
//     //   chrome.tabs.query({}, (tabs) => {
//     //     pickTab(tabs).catch(onError);
//     //   });
//     //   sendResponse("done");
//     //   return true;
//     // }
    
//     // return false;
//   });
  
//   async function pickTab(tabs) {
//     const result = await new Promise(resolve => {
//       chrome.storage.local.get("whitelist", resolve);
//     });
//     const whitelist = result.whitelist || [];
  
//     const productiveTabs = tabs.filter((tab) => {
//       try {
//         const hostname = new URL(tab.url).hostname;
//         return whitelist.includes(hostname);
//       } catch {
//         return false;
//       }
//     });
  
//     if (productiveTabs.length === 0) return;
  
//     const randomTab = productiveTabs[Math.floor(Math.random() * productiveTabs.length)];
//     chrome.tabs.update(randomTab.id, { active: true });
//   }
  
//   function onError(error) {
//     console.error(`Error: ${error}`);
//   }