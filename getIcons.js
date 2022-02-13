import { readdir, copyFile, readFileSync } from "fs";
import path from "path";

let cwd = process.cwd();
console.log(`cwd: ${cwd}`);
function browserLookup(name) {
  let ext = path.extname(name);
  let browser = path.basename(name, ext);
  let browserPath = `${cwd}/node_modules/browser-logos/src/${browser}/`;
  let files = readdir(browserPath, { withFileTypes: true }, (err, files) => {
    if (files) {
      files.forEach((file) => {
        console.log(file);
        console.log(`trying to match ${file.name} to ${browser}${ext}`);
        if (file.name == `${browser}${ext}`) {
          console.log(`Found ${file.name}`);
          let src = `${browserPath}${file.name}`;
          console.log(`src: ${src}`);
          copyFile(src, `${cwd}${name}`, (err) => {
            if (err) {
              console.log(`There was an error copying ${file.name}: ${err}`);
            }
          });
        }
      });
    } else {
      console.log(err);
    }
  });
}

console.log("getting browser icons");
let browsersFile = `${cwd}/lib/browsers.js`;

let browserIcons = readFileSync(browsersFile, "utf8", (err, contents) => {
  console.log("read file");
  if (contents) {
    return contents;
  } else {
    console.log(`There was an error reading ${file.name}: ${err}`);
  }
});

let regex = /img: kenvPath\("([\/A-z\.]+)"\)/g;
let matches = browserIcons.match(regex);
console.log(matches);

matches.forEach((match) => {
  console.log(match);
  let filename = match.replace(regex, "$1");
  browserLookup(filename);
});

export default {};
