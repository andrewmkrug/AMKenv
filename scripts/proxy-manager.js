// Name: Proxy Manager
// Description: Manage your HTTP Toolkit
// Author: Andrew M Krug
// Twitter: @andrewmkrug

import "@johnlindquist/kit";

import * as updateEnv from "./update-env";

let proxyPathEnv = await env("PROXY_PATH", "Set a path for the proxy");
let proxyPath = await path.dirname(proxyPathEnv);
// log(isDir(proxyPath))
if (!isDir(proxyPath)) mkdir(proxyPath);

async function gitCloneInDir(dir, url, rename = null) {
  log(`Cloning ${url} to ${dir}`);
  let gitDir = path.resolve(dir, ".git");
  if (await dir.exists(gitDir)) {
    log(`${dir} already exists, going to perform a git pull`);
    await exec(`cd ${dir} && git pull`);
  } else {
    log(`${dir} does not exist, going to perform a git clone`);
    await exec(`git clone ${url} ${dir} ${rename}`);
  }
}

onTab("Init", async () => {
  let install = await arg("Install proxy", ["Yes", "No"]);
  if (install == "Yes") {
    log("Installing proxy ui");
    await $`cd ${proxyPath} && git clone https://github.com/andrewmkrug/httptoolkit-ui.git ui && ui && npm install`;
    log("Installing proxy desktop");
    await $`cd ${proxyPath} && git clone https://github.com/httptoolkit/httptoolkit-desktop.git desktop && cd desktop && npm install`;
  }
});

onTab("Project Updates", async () => {
  let update = await arg("Update projects", ["desktop", "ui", "all"]);
  if (update != "desktop") {
    await $`cd ${proxyPath}/ui && git pull && npm install`;
  }
  if (update != "ui") {
    await $`cd ${proxyPath}/desktop && git pull && npm install`;
  }
});
