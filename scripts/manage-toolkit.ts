// Name: Manage Toolkit
// Author: Andrew M Krug
// Description: A toolkit for managing your Mocking Server
// Twitter: @andrewmkrug

import "@johnlindquist/kit"
var net = await import('net');

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


var portInUse = function (port, callback) {
    var server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.on('error', function (e) {
        callback(true);
    });
    server.on('listening', function (e) {
        server.close();
        callback(false);
    });

    server.listen(port, '127.0.0.1');
};



let running = portInUse(45456, function (returnValue) {
    log(`The port 45456 is ${returnValue}`);
    return (returnValue);
});

let r = () => {
    var server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.on('error', function (e) {
        log(e);
        log(`The port 45456 is running`);
        return (true);
    });
    server.on('listening', function (e) {
        log(e)
        log(`The port 45456 is not running`);
        server.close();
        return (false);
    });

    server.listen(45456, '127.0.0.1');
}

let choice = await arg("What do you want to do?", async () => {

    let choices = [r ? { name: "Start" } : { name: "Stop" }, { name: "Update" }];

    return (choices);
})