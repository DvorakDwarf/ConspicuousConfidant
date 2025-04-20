//Things we store
// An array of allowed URLs
// Enabled or disabled

console.log("WORKING");

function troll() {
//     // Mess with html here



//   const random_num = Math.floor(Math.random() * 3) + 1;

//   switch (random_num) {
//     case 1:
//       document.body.style.border = "100px solid green";
//     break;
//     case 2:
//       document.body.style.filter = "blur(100px)";
//       break;
//     case 3:
//       document.body.innerHTML = document.body.innerHTML.replace(/\b\w+\b/g, "Coke");
//       break;

    // document.body.style.border = "5px solid red";

    // document.body.style.border = "100px solid green";
    // for (let index = 0; index < 10000000; index++) {
    //     document.body.style.transform = "rotate(180deg)";
    // }

    // document.body.style.filter = "blur(100px)";

    // document.body.innerHTML = document.body.innerHTML.replace(/\b\w+\b/g, "Coke");

    // document.querySelectorAll("*").forEach(el => {
    //     el.style.animation = "spin 2s linear infinite";
    // });

    // const style = document.createElement("style");
    // style.innerHTML = `
    //     @keyframes spin {
    //         0% { transform: rotate(0deg); }
    //         100% { transform: rotate(360deg); }
    //     }`;
    // document.head.appendChild(style);
}


// export function getWhitelist(){
//     browser.storage.local.get("whitelist").then((item) => {
//         console.log(item);
//     });
// }

//Send message to background
//Could be started, but activated when user reaches productive tab. Check here again.
async function backToProductivity() {
    console.log("Sending to productivity tab?");

    let whitelist = (await browser.storage.local.get("whitelist")).whitelist;
    if (!whitelist.includes(window.location.hostname)) {
        browser.runtime.sendMessage({
            command: "switch_tab"
        }); 
    }
}

window.addEventListener("visibilitychange", async () => {
    const enabled = (await browser.storage.local.get("enabled"))["enabled"]; 

    if (!enabled) { 
        console.log("Disabled");
        return; 
    }
    if (document.hidden) { return; }

    const query_guys = document.querySelectorAll(".little_guy");
    if (query_guys.length < 1) { 
        console.log("Add elements");
        var little_guy = document.createElement("div");
        little_guy.style = "bottom:0px;right:0px;position:fixed;z-index: 9999;background:whitesmoke"
        little_guy.className = "little_guy";
        // little_guy.style.background = "whitesmoke";

        var text = document.createElement("p");
        text.innerHTML = "Blah Blah Blah Blah Blah Blah Blah Blah";
        text.style.width = "200px";
        text.style.fontSize = "12px";
        // text.style.color = "black";
        little_guy.appendChild(text);

        var image = document.createElement("img");
        image.src = browser.runtime.getURL("images/TheYeller.png");
        image.width = 200;
        image.height = 200;
        little_guy.appendChild(image);
    
        document.body.appendChild(little_guy);
    }


    console.log("NEW TAB");

    const wait_time = (await browser.storage.local.get("wait_time"))["wait_time"]; 
    const troll_time = (await browser.storage.local.get("troll_time"))["troll_time"]; 

    setTimeout(backToProductivity, wait_time);
    setInterval(troll, troll_time);
});


async function getFromBackground(key) {
    return new Promise((resolve) => {
      browser.runtime.sendMessage(
        {
          action: "getStorage",
          key: key,
        },
        (response) => {
          resolve(response.data);
        }
      );
    });
  }
  
  async function saveToBackground(key, value) {
    return new Promise((resolve) => {
      browser.runtime.sendMessage(
        {
          action: "setStorage",
          key: key,
          value: value,
        },
        () => {
          resolve();
        }
      );
    });
  }
  
  // Example usage in your existing functions
  async function backToProductivity() {
    console.log("Sending to productivity tab?");
    
    // Use the new function to get whitelist
    let whitelist = (await getFromBackground("whitelist"));

    if (!(whitelist.includes(window.location.hostname))) {
      browser.runtime.sendMessage({
        command: "switch_tab"
      }); 
    }
  }
  
async function callConfidant() {
    const enabled = await getFromBackground("enabled");
    
    if (!enabled) { 
      console.log("Disabled");
      return; 
    }
    if (document.hidden) { return; }
  
    console.log("Calling Confidant");
  
    const wait_time = await getFromBackground("wait_time");
    const troll_time = await getFromBackground("troll_time");
  
    setTimeout(backToProductivity, wait_time);
    setInterval(troll, troll_time);
}

// Update your visibilitychange listener
window.addEventListener("visibilitychange", callConfidant);
callConfidant();