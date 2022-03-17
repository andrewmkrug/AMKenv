// Name: Toolkit Proxy
// Author: Andrew M Krug
// Description: A toolkit for managing your Mocking Server
// Twitter: @andrewmkrug

import "@johnlindquist/kit";

const envKey = "GIT_MOCK_PATH";

if (!process.env[envKey]) {
  let input = await path({
    startPath: "~",
    hint: "Set a path for the Mocking Server"
  });

  await global.cli("set-env-var", envKey, `${input}/toolkit-server`);
  global.env[envKey] = process.env[envKey] = input;

  let repoUrl = `https://github.com/andrewmkrug/toolkit-server.git`;

  cd(input);
  await exec(`git clone ${repoUrl}`);
  cd(`toolkit-server`);
  await exec(`npm install`);
}

let dir = await env(envKey);

await terminal(`cd ${dir} && npm run start`);

await focusTab(`https://toolkit.krugweb.services`, "Google Chrome");
