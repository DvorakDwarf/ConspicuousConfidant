//Things we store
// An array of allowed URLs
// Enabled or disabled

//Send message to background
function backToProductivity() {
    console.log("Sending to productivity tab");
    browser.runtime.sendMessage({
        command: "switch_tab"
    }); 
}

function troll() {
    //Mess with html here
    // document.body.style.border = "5px solid red";
}

// if (Window.localStorage.getItem("whitelist") == []) {
    
// }

setTimeout(backToProductivity, 1000 * 1);

setInterval(troll, 1000 * 5);