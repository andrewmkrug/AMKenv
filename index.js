import { readdir, copyFile, readFileSync, writeFileSync } from "fs";
import { kenvPath } from "@johnlindquist/kit";
import commandExists from "command-exists";

console.log(await commandExists("kit"));

let kenv = await kenvPath();
let cwd = process.cwd();

console.log(`kenv: ${kenv}`);
console.log(`cwd: ${cwd}`);

let images = readdir(`${cwd}/assets`, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    console.log(file.name);
    if (file.name.endsWith(".svg") || file.name.endsWith(".png")) {
      copyFile(
        `${cwd}/assets/${file.name}`,
        `${kenv}/assets/${file.name}`,
        (err) => {
          if (err) {
            console.log(`There was an error copying ${file.name}: ${err}`);
          }
        }
      );
    }
  });
  if (err) {
    console.log(err);
  }
});

let scripts = readdir(
  `${cwd}/scripts`,
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      console.log(file.name);

      if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
        let filename = `${cwd}/scripts/${file.name}`;
        let contents = readFileSync(filename, "utf8", (err, contents) => {
          if (contents) {
            console.log(contents);
          } else {
            console.log(`There was an error reading ${file.name}: ${err}`);
          }
        });

        // delete previously generated icon paths
        let delRegex = /(\/\/[\ ]+img:) ([A-z\/\.-]+)\n/gi;
        contents = contents.replace(delRegex, "");

        let regex = /((\/\/[\ ]+base-img:) ([A-z\/\.-]+))\n/gi;
        let match = regex.exec(contents);
        if (match) {
          let newContents = "";
          if (match[2].startsWith(kenv)) {
            newContents = contents.replace(regex, `$1 $2`);
          } else {
            newContents = contents.replace(regex, `$1\n// img: ${kenv}$3\n`);
          }
          writeFileSync(filename, newContents, (err) => {
            if (err) {
              console.log(`There was an error writing ${file.name}: ${err}`);
            }
          });
        }
      }
    });
    if (err) {
    }
  }
);

export default {};
