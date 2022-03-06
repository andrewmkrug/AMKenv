// name: AMKenv Bonuses
// description: Manage AMKenv bonuses
// base-img: /assets/icon.png
// author: Andrew M Krug
// twitter: @andrewmkrug

import "@johnlindquist/kit";
import "path";

let kenvDir = dirname(
  dirname(import.meta.url.replace(/file:\/\//, "").split("?")[0])
);

let choice = await arg("Which bonus:", [
  {
    name: "Install Images",
    description: "Installs all the images",
    img: kenvDir + "/assets/icon.png"
  }
]);

if (choice.name == "Images") {
  await term(`cd ${kenvDir} && npm run postprepare`);
}

if (choice.name == "Upgrade") {
}
