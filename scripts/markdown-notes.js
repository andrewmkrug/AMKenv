// Name: Markdown Notes
// Description: Quickly open and access notes in markdown.
// Author: Andrew M Krug
// Twitter: @andrewmkrug
// base-img: /assets/markdown.svg

import("@johnlindquist/kit");

const envKey = "NOTES_DIR";

const kP = dirname(
  dirname(import.meta.url.replace(/file:\/\//, "").split("?")[0])
);

if (!process.env[envKey]) {
  let input = await path({
    startPath: "~/",
    hint: "Path to directory for saving notes"
  });

  await global.cli("set-env-var", envKey, input);
  global.env[envKey] = process.env[envKey] = input;
}

let notesDir = await env(envKey);

let tools = await [
  {
    name: "Obsidian",
    description: "Markdown note taking app",
    img: await `${kP}/assets/obsidian-logo.svg`
  },
  {
    name: "Markdown",
    description: "Popup window for quick editing, will be a paid feature",
    img: await `${kP}/assets/script-kit-logo.svg`
  },
  {
    name: "VS Code",
    description: "Code editor from Microsoft",
    img: await `${kP}/assets/visual-studio-code.svg`
  }
];

async function pathToArray(path) {
  log(path);
  let pathArray = path.split("/");
  log(pathArray);
  return pathArray;
}

onTab("Notes", async () => {
  let note = await path(await env(envKey));

  log(tools);
  let tool = await arg({
    placeholder: "Tool:",
    choices: async () => tools
  });
  log(`Opening ${note} with ${tool.name}`);

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
        // log(contents);
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
