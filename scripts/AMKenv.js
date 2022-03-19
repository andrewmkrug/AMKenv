// name: AMKenv Bonuses
// description: Manage AMKenv bonuses
// base-img: /assets/icon.png
// twitter: @andrewmkrug

import "@johnlindquist/kit";
import "path";
import { readdir, readFileSync, writeFileSync } from "fs";

const delRegex = /(\/\/ img:) ([A-z0-9\/\.-]+)\n/gi;
const regex = /(\/\/[ ]+base-img: ([A-z0-9\/\.-]+)\n)/gi;
let kenvDir = dirname(
  dirname(import.meta.url.replace(/file:\/\//, "")).split("?")[0]
);
log(`kenv: ${kenvDir}`);
let choice = await arg("Which bonus:", [
  {
    name: "Install Images",
    description: "Installs all the images",
    img: kenvDir + "/assets/icon.png",
    id: "install"
  },
  {
    name: "Upgrade AMKenv",
    description: "Upgrades AMKenv to the latest version",
    id: "upgrade"
  }
]);

log(choice);
if (choice.id == "install") {
  // go thru scripts
  log("install");
  readdir(`${kenvDir}/scripts/`, { withFileTypes: true }, (err, files) => {
    log(files);
    files.forEach((file) => {
      log(file.name);
      if (file.name.match(/.[t|j]s/)) {
        let filename = `${kenvDir}/scripts/${file.name}`;
        log(`opening ${filename}`);
        let contents = readFileSync(filename, "utf8", (err, contents) => {
          if (contents) {
            log(contents);
          } else {
            log(`There was an error reading ${file.name}: ${err}`);
          }
        });

        log(`got the contents`);
        // delete previously generated icon paths
        contents = contents.replace(delRegex, "");
        log(`regex: ${regex}`);
        let match = regex.exec(contents);
        log(match);
        if (match) {
          let newContents = contents.replace(regex, `$1// img: ${kenvDir}$2\n`);

          writeFileSync(filename, newContents);
        }
      }
    });
    if (err) {
      log(`err: ${err}`);
    }
  });
}

if (choice.id == "upgrade") {
  await term(`kit kenv-pull ${kenvDir.split("/").pop()}`);
}
