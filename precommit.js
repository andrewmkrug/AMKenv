import { readdir, copyFile, readFileSync, writeFileSync } from "fs";

let cwd = process.cwd();

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

        writeFileSync(filename, contents, (err) => {
          if (err) {
            console.log(`There was an error writing ${file.name}: ${err}`);
          }
        });
      }
    });
    if (err) {
    }
  }
);
