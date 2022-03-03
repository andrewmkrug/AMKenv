// Name: Save Tabs
// Description: Save all tabs to a markdownfile, with support for Obsidian.
// Author: Andrew M Krug
// twitter: @andrewmkrug
// base-img: /assets/save-tabs.svg
// icon: /assets/icon.png

import "@johnlindquist/kit";
import browsers from "../lib/browsers.js";
let dateformat = await npm("dateformat");

const envKey = "NOTES_DIR";

if (!process.env[envKey]) {
  let input = await path({
    startPath: "~/",
    hint: "Path to directory for saving notes"
  });

  await global.cli("set-env-var", envKey, input);
  global.env[envKey] = process.env[envKey] = input;
}

let notesDir = await env("NOTES_DIR", "Path to directory for saving tabs");
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

log(`${notesDir}/${name}`);

await appendFile(`${notesDir}/${name}.md`, notes);
