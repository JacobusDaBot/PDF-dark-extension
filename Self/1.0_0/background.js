//import { toggleToDarkMode } from "./scripts/content-script.js";

 function toggleToDarkMode(state) {
  console.log("toggleToDarkMode");
  if (state === "ON") {
    const cover = document.createElement("div");
    let css = `
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color:darkgrey;
    mix-blend-mode: exclusion;
    z-index: 7;
    `;//darken

    const cover2 = document.createElement("div");
    let css2 = `
      position: fixed;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgb(82,86,89);
      mix-blend-mode: difference;
      z-index: 8;

    `;
    cover.setAttribute("style", css);
    cover2.setAttribute("style", css2);
    cover.id="dark-mode-cover_i1";    
    cover2.id="dark-mode-cover_i2";
    cover.classList.add("dark-mode-cover");
    cover2.classList.add("dark-mode-cover");

    document.body.appendChild(cover);
    document.body.appendChild(cover2);
  } else if (state === "OFF") {
    const children = document.body.childNodes;
    for (const child of children) {
      if (child.classList && child.classList.contains("dark-mode-cover")) {
        document.body.removeChild(child);
      }
    }
    const children2 = document.body.childNodes;
    for (const child of children2) {
      if (child.classList && child.classList.contains("dark-mode-cover")) {
        document.body.removeChild(child);
      }
    }
  } else {
    console.error("Unknown state");
  }
}
chrome.action.onClicked.addListener(async (tab) => {
  const currentState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = currentState === "ON" ? "OFF" : "ON";
  chrome.action.setBadgeText({ tabId: tab.id, text: nextState });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleToDarkMode,
    args: [nextState],
  });
});
