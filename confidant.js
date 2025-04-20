//Things we store
// An array of allowed URLs
// Enabled or disabled

console.log("WORKING");

function troll() {
    //Mess with html here
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

    console.log("NEW TAB");

    const wait_time = (await browser.storage.local.get("wait_time"))["wait_time"]; 
    const troll_time = (await browser.storage.local.get("troll_time"))["troll_time"]; 

    setTimeout(backToProductivity, wait_time);
    setInterval(troll, troll_time);
});