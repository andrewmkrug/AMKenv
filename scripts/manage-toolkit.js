// Name: HTTP Toolkit
// Author: Andrew M Krug
// Description: A toolkit for managing your Mocking Server
// Twitter: @andrewmkrug

import "@johnlindquist/kit";
var net = await import("net");

let netstat = await npm("node-netstat");

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

onTab("Status", async () => {
  //   let status = netstat.isListening(45456);
  //   log(status);
  while (true) {
    setPanel(md(`# The port 45456 is ${r ? "running" : "not running"}`));
    setTab("Status");
  }
});

let r = () => {
  var server = net.createServer(function (socket) {
    socket.write("Echo server\r\n");
    socket.pipe(socket);
  });

  server.on("error", function (e) {
    log(e);
    log(`The port 45456 is running`);
    return true;
  });
  server.on("listening", function (e) {
    log(e);
    log(`The port 45456 is not running`);
    server.close();
    return false;
  });

  server.listen(45456, "127.0.0.1");
};

// onTab("Toolkit Status", async () => {
//     setPanel: {
//         if (r) {

//         }
//     }
// })

// onTab("Manage Toolkit", () => {
//   let choice = await arg("What do you want to do?", async () => {
//     log(r);
//     let choices = [
//       r
//         ? {
//             name: "Start",
//             img: kenvPath("/assets/start.svg")
//           }
//         : {
//             name: "Stop",
//             img: kenvPath("/assets/stop.svg")
//           },
//       { name: "Update" }
//     ];
//   });
//   if (choice.name === "Start") {
//     // cd(process.env[envKey]);
//     terminal(`npm start`);
//     // browse(`https://toolkit.krugweb.services`);
//   }
//   if (choice.name === "Stop") {
//     terminal(keystroke("ctrl+c"));
//   }
//   if (choice.name === "Update") {
//     // cd(process.env[envKey]);
//     terminal(`git pull -r origin main`);
//   }
// });
