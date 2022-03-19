// Name: Save Tabs
// Description: Save all tabs to a markdownfile, with support for Obsidian.
// Author: Andrew M Krug
// twitter: @andrewmkrug
// base-img: /assets/save-tabs.svg
// icon: /assets/icon.png

import "@johnlindquist/kit";

import browsers from "../lib/browsers.js";

const envKey = "NOTES_DIR";

if (!process.env[envKey]) {
  let input = await path({
    startPath: "~/",
    hint: "Path to directory for saving notes"
  });

  await global.cli("set-env-var", envKey, input);
  global.env[envKey] = process.env[envKey] = input;
}

let notesDir = await env("NOTES_DIR", "Path to directory for MD based notes");

let browser = await arg("Which browser:", browsers);

let tabs = await getTabs(browser);
log("got tabs");
log("getting filename");

let tabsMd = tabs
  .map((tab) => `* [${tab.title || tab.url}](${tab.url})`)
  .join("\n");

let notes = await editor(tabsMd);

let dt = new Date()
  .toISOString()
  .replace(/T/, "--")
  .replace(/:/g, "-")
  .replace(/\..+/, "")
  .split("Z")[0];

let choices = {
  type: "input",
  name: "filename",
  message: "Filename:",
  hint: "Enter a filename",
  input: `${dt}-${browser}`
};

let name = await arg(choices);

log(`${notesDir}/${name}`);

await appendFile(`${notesDir}/${name}.md`, notes);
