// Name: Save Tabs
// Description: Save all tabs to a markdownfile, with support for Obsidian.
// Author: Andrew M Krug
// twitter: @andrewmkrug
// base-img: /assets/image2vector.svg
// img: /Users/andrewmkrug/.kenv/assets/image2vector.svg
// icon: /assets/icon.png

import "@johnlindquist/kit";
import browsers from "../lib/browsers.js";
import dateformat from "dateformat";

let obsidianDir = await env("NOTES_DIR", "Path to directory for saving tabs");
log("getting tabs");

let browser = await arg("Which browser:", browsers);

let tabs = await getTabs(browser);
log("got tabs");
log("getting filename");

let tabsMd = tabs
  .map((tab) => `* [${tab.title || tab.url}](${tab.url})`)
  .join("\n");

let notes = await editor(tabsMd);

let date = dateformat(new Date(), "yyyy-mm-dd--hh-MM-ss");

let choices = {
  type: "input",
  name: "filename",
  message: "Filename:",
  hint: "Enter a filename",
  input: `${date}`
};

let name = await arg(choices);

let dir = await path(obsidianDir);

log(`${obsidianDir}/${name}`);

await appendFile(`${obsidianDir}/${name}.md`, notes);
