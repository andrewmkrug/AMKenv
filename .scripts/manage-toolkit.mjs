// .kenv/kenvs/shared/scripts/manage-toolkit.ts
import "@johnlindquist/kit";
var netstat = await npm("node-netstat");
var envKey = "GIT_MOCK_PATH";
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
var runnning = await netstat.isPortOpen(45656);
log(runnning);
dev(runnning);
var choice = await arg("What do you want to do?", async () => {
});
