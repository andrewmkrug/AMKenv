// Name: Manage Toolkit
// Author: Andrew M Krug
// Description: A toolkit for managing your Mocking Server
// Twitter: @andrewmkrug

import "@johnlindquist/kit"

let netstat = await npm("node-netstat")


const envKey = "GIT_MOCK_PATH";

if (!process.env[envKey]) {
    let input = await path({
        startPath: "~/mock-server",
        hint: "Set a path for the Mocking Server"
    });

    await global.cli("set-env-var", envKey, input);
    global.env[envKey] = process.env[envKey] = input;

    let repoUrl = `https://github.com/andrewmkrug/toolkit-server.git`;

    cd(input);
    await exec(`git clone ${repoUrl} ${input}`);
    cd(`toolkit-server`);
    await exec(`npm install`);
}

let runnning = await netstat.isPortOpen(45656);
log(runnning)
dev(runnning)
let choice = await arg("What do you want to do?", async () => {

})