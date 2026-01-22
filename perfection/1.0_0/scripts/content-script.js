// var cover = document.createElement("div");
// let css = `
//     position: fixed;
//     pointer-events: none;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     background-color: white;
//     mix-blend-mode: difference;
//     z-index: 1;
// `;
// cover.setAttribute("style", css);
// document.body.appendChild(cover);

// chrome.storage.local.set({
//   ddd: "fdfddf",
// });

export function toggleToDarkMode(state) {
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
    background-color: white;
    mix-blend-mode: difference;
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
