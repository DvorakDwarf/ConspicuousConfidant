//Things we store
// An array of allowed URLs
// Enabled or disabled

console.log("WORKING");

const script = {
  "general": [
    "I am in your walls",
    "Get to work",
    "Time waits for no one",
    "Overconfidence is a slow and insidious killer",
    "I will retire before you finally finish your work",
    "A day will come when you will rue procrastinating on this task",
    "Get back in there and finish your assignment",
    "That isn't very egg-celent of you",
    "Get back to work or I'll eat your files in your sleep",
    "Ya lazy bum, finish your work"
  ],
  "productive" : [
    "On task and on time",
    "Good job",
    "Good work"
  ],
  "stackoverflow.com": [
    "Now this is what I call a productive website"
  ],
  "openai.com": [
    "Are you going to ask mom to do your homework for you?"
  ],
  "wikipedia.org": [
    "What a monument to the good internet"
  ]
}

async function isOnProductiveTab() {
  return (await getFromBackground("whitelist")).includes(window.location.hostname);
}

// Mess with html here
async function troll() {
  // if (await isOnProductiveTab()) {
  //   return;
  // }

  const CASES = 5;
  var random_num = Math.floor(Math.random() * CASES) + 1;

  console.log(random_num);

  switch (random_num) {
    case 1:
      document.body.style.border = "100px solid green";
      break;
    case 2:
      document.body.style.filter = "blur(2px)";
      break;
    case 3:
      var elements = document.body.getElementsByTagName("p"); 
      console.log(elements);
      elements[Math.floor(Math.random() * elements.length)].innerHTML = "I am in your walls";
      break;
    case 4:
        document.body.style.transform = "rotate(20deg)";
        break;
    case 5:
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
        }`;
        document.head.appendChild(style);
        document.querySelectorAll("*").forEach(el => {
          el.style.animation = "spin 2s linear 0s";
        });
    }
}

//Send message to background
//Could be started, but activated when user reaches productive tab. Check here again.
async function backToProductivity() {
  console.log("Sending to productivity tab?");

  if (!(await isOnProductiveTab())) {
    browser.runtime.sendMessage({
        command: "switch_tab"
    }); 
  }
}

async function selectLine(hostname) {

	if (script[hostname] != undefined) {
    return script[hostname][Math.floor(Math.random() * script[hostname].length)];

  } else if ((await getFromBackground("whitelist")).includes(hostname)) {
    return script["productive"][Math.floor(Math.random() * script["productive"].length)];

	} else{
		return script["general"][Math.floor(Math.random() * script["general"].length)];
	}
}

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

    if (!(await isOnProductiveTab())) {
      browser.runtime.sendMessage({
        command: "switch_tab"
      }); 
    }
  }
  
async function callConfidant() {
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
        text.innerHTML = await selectLine(window.location.hostname);
        text.style.width = "200px";
        text.style.fontSize = "12px";
        text.style.color = "black";
        little_guy.appendChild(text);

        var image = document.createElement("img");
        image.src = browser.runtime.getURL("images/TheYeller.png");
        image.width = 200;
        image.height = 200;
        little_guy.appendChild(image);
    
        document.body.appendChild(little_guy);
    }

    const wait_time = (await browser.storage.local.get("wait_time"))["wait_time"]; 
    const troll_time = (await browser.storage.local.get("troll_time"))["troll_time"]; 

    setTimeout(backToProductivity, wait_time);
    setInterval(troll, troll_time);
}

// Update your visibilitychange listener
window.addEventListener("visibilitychange", callConfidant);
callConfidant();