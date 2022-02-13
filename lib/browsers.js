const browsers = [
  {
    browser: "Chrome",
    name: "Chrome",
    value: "Google Chrome",
    description: "Possibly the most popular browser.",
    img: kenvPath("/assets/chrome.svg"),
  },
  {
    name: "Firefox",
    browser: "Firefox",
    value: "Firefox",
    description: "Leading open source browser not built on Chromium.",
    img: kenvPath("/assets/firefox.svg"),
  },
  {
    name: "Microsoft Edge",
    browser: "Microsoft Edge",
    value: "Edge",
    description: "Microsoft's browser. Cloned from Chrome.",
    img: kenvPath("/assets/edge.svg"),
  },
  {
    name: "Brave",
    browser: "Brave",
    value: "Brave",
    description:
      "Brave is a security focused browser that is built on Chromium.",
    img: kenvPath("/assets/brave.svg"),
  },
];

export default browsers;
