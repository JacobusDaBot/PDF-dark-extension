//import { toggleToDarkMode } from "./scripts/content-script.js";

 function toggleToDarkMode(state) {
  console.log("toggleToDarkMode");
  if (state === "ON") {
    const cover = document.createElement("div");
    const css = `
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity:0.5;
    z-index: 1;
`;
    cover.setAttribute("style", css);
    cover.classList.add("dark-mode-cover");
    document.body.appendChild(cover);
  } else if (state === "OFF") {
    const children = document.body.childNodes;
    for (const child of children) {
      if (child.classList && child.classList.contains("dark-mode-cover")) {
        document.body.removeChild(child);
      }
    }
  } else {
    console.error("Unknown state");
  }
}
/*
function registerEventRules() {
  if (registerEventRules.hasRunOnce) {
    return;
  }
  registerEventRules.hasRunOnce = true;

  if (!chrome.declarativeContent.ShowAction) {
    // Chrome < 97.
    chrome.declarativeContent.ShowAction =
      chrome.declarativeContent.ShowPageAction;
  }

  let rule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: "file:///*.pdf" },
      }),
    ],
    actions: [new chrome.declarativeContent.ShowAction()],
  };

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule], function () {
      // Visibility of action fully controlled by declarativeContent.
      chrome.action.disable();
    });
  });
}
/*
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onInstalled.addListener((tab) => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });
  registerEventRules();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.runtime.onStartup.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.storage.session.set({ status: "OFF" });
  });

  registerEventRules();
});
registerEventRules();*/
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
