// Name: Save Tabs
// Description: Save all tabs to a markdownfile, with support for Obsidian.
// Author: Andrew M Krug
// twitter: @andrewmkrug

import "@johnlindquist/kit";
import browsers from "../lib/browsers.js";

let obsidianDir = await env("NOTES_DIR", "Path to directory for saving tabs");
log("getting tabs");

let browser = await arg("Which browser:", browsers);

let tabs = await getTabs(browser);
log("got tabs");
log("getting filename");
let date = new Date().toISOString();

let name = await arg("Filename:", [`${date}`]);

let tabsMd = tabs
  .map((tab) => `* [${tab.title || tab.url}](${tab.url})`)
  .join("\n");

let notes = await editor(tabsMd);
log(name);
log(`${obsidianDir}/${name}`);

await appendFile(`${obsidianDir}/${name}.md`, notes);
