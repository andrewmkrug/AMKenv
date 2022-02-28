// Name: Save Tabs
// Description: Save all tabs to a markdownfile, with support for Obsidian.
// Author: Andrew M Krug
// twitter: @andrewmkrug
// base-img: /assets/LegoGuy.svg
// img: /Users/andrewmkrug/.kenv/assets/LegoGuy.svg
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

let name = await arg(choices);

let date = dateformat(new Date(), "yyyy-mm-dd--hh-MM-ss");

let dir = await path(obsidianDir);

let choices = {
  type: "input",
  name: "filename",
  message: "Filename:",
  hint: "Enter a filename",
  input: `${date}`
};

log(`${obsidianDir}/${name}`);

await appendFile(`${obsidianDir}/${name}.md`, notes);
