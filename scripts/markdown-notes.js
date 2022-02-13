// Name: Markdown Notes
// Description: Quickly open and access notes in markdown.
// Author: Andrew M Krug
// Twitter: @andrewmkrug
// img: /Users/andrewmkrug/.kenv/assets/markdown.svg

/** @type {import("@johnlindquist/kit")} */

let notesDir = await env("OBSIDIAN_DIR");

let tools = [
  {
    name: "Obsidian",
    description: "Markdown note taking app",
    img: kenvPath("/assets/obsidian-logo.svg"),
  },
  {
    name: "Markdown",
    description: "Popup window for quick editing, will be a paid feature",
    img: kenvPath("/assets/script-kit-logo.svg"),
  },
  {
    name: "VS Code",
    description: "Code editor from Microsoft",
    img: kenvPath("/assets/visual-studio-code.svg"),
  },
];

async function pathToArray(path) {
  log(path);
  let pathArray = path.split("/");
  log(pathArray);
  return pathArray;
}

onTab("Notes", async () => {
  let note = await path(notesDir);

  let tool = await arg("Tool:", tools);
  log(`Opening ${note} with ${tool.name}`);

  let notePathArray = await pathToArray(note);

  let noteLocation = note.replace(notesDir + "/", "");

  switch (tool.name.replace(" ", "").toLowerCase()) {
    case "obsidian": {
      let n = encodeURIComponent(noteLocation).replace(".md", "");
      log(n);
      let cmd = `obsidian://open?vault=obsidian&file=${n}`;
      log(cmd);
      await $`open ${cmd}`;
      break;
    }
    case "markdown": {
      let contents = await ensureReadFile(`${note}`);
      while (true) {
        log("REPL");
        contents = await editor(contents);
        await writeFile(cmd, contents);
      }
      break;
    }
    case "vscode":
      await exec(`code '${note}'`);
      break;
  }
});