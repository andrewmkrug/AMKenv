// Name: Convential Commits
// Description: Helps you create a conventional commit message
// Author: Andrew M Krug
// Twitter: @andrewmkrug
// base-img: /assets/conventional-commits.svg
// icon: /assets/icon.png

import "@johnlindquist/kit";

import conventionalCommits from "../lib/conventional-commits.js";

conventionalCommits.map((c) => {
  return {
    name: c.title,
    description: c.description,
    img: c.emoji,
    value: c.type
  };
});

let { scopes, write } = await db({ scopes: [] });

let onNoChoices = async (input) => {
  if (input) setPanel(md(`# Enter to create "${input}"`));
  else setPanel(md(`# Enter a scope name`));
};

let scopesConfig = {
  placeholder: "Enter a scope name",
  strict: false,
  onNoChoices,
  hint: "Enter a scope name"
};

let message = await arg({
  placeholder: "Commit message:",
  hint: "Enter a commit message"
});
let scope = await arg(scopesConfig, scopes);

if (typeof scope == "string") {
  scopes.push({
    name: scope,
    id: uuid()
  });
  await write();
}

let scopeName = _.find(scopes, scope)?.name;
let type = await arg(
  { placeholder: "Commit type:", hint: "Enter a commit type" },
  conventionalCommits
);

let show = await arg(
  {
    placeholder: "Show emoji in commit message:",
    hint: "Choose to show the emoji"
  },
  [
    {
      name: "[Y]es",
      value: true
    },
    {
      name: "[N]o",
      value: false
    }
  ]
);
