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

setTimeout(backToProductivity, 1000 * 1);

setInterval(troll, 1000 * 5);