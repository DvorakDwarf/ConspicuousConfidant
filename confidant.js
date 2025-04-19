//Things we store
// An array of allowed URLs
// Enabled or disabled

console.log("WORKING");

//Send message to background
function backToProductivity() {
    console.log("Sending to productivity tab");
    browser.runtime.sendMessage({
        type: "switch_tab"
    }); 
}

function troll() {
    //Mess with html here
    // document.body.style.border = "5px solid red";
}

// if (Window.localStorage.getItem("whitelist") == []) {
    
// }

export function getWhitelist(){
    browser.storage.local.get("whitelist").then((item) => {
        console.log(item);
    });
}



setTimeout(backToProductivity, 1000 * 1);

setInterval(troll, 1000 * 5);