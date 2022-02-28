// .kenv/kenvs/shared/scripts/manage-toolkit.ts
import "@johnlindquist/kit";
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
var running = await execa(`lsof -nP -iTCP -sTCP:LISTEN | grep 45456`);
log(running);
var choice = await arg("What do you want to do?", async () => {
});
