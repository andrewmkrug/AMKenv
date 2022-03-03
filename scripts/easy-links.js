// Name: Easy Links
// Description: Save impoort links with a description as well, better than just bookmarking.
// Author: Andrew M Krug
// Twitter: @andrewmkrug
// base-img: /assets/easy-links.svg
// img: /Users/andrewmkrug/.kenv/assets/easy-links.svg

/** @type {import("@johnlindquist/kit")} */

import browsers from "../lib/browsers.js";

let { links, write } = await db({ links: [] });

let browser = await env("KIT_BROWSER", browsers);

function setPreview(name, url, description, context) {
  return md(`# ${name} 
  
  ## ${url}  
  
  ${description}
  
  ${context}`);
}

async function editLink() {
  let l = await arg(
    "Link:",
    links.map((link) => {
      return {
        name: link.name,
        preview: async () =>
          setPreview(link.name, link.url, link.description, link.context),
        url: link.url,
        description: link.description,
        context: link.context,
        id: link.id
      };
    })
  );
  let link = _.find(links, l);
  let n = await arg({
    placeholder: "New link:",
    hint: "Enter a name to remember the link",
    input: link.name
  });
  let u = await arg({
    placeholder: "URL:",
    hint: "Enter the URL",
    input: link.url
  });
  let d = await arg({
    placeholder: "Enter a short description",
    hint: "Add emojis to make the description more meaningful",
    input: link.description
  });

  let c = await textarea({
    placeholder:
      "Enter a more information if you need more context hit cmd + s to save",
    hint: "Add emojis to make the description more meaningful",
    value: link.context
  });

  link.name = n;
  link.url = u;
  link.description = d;
  link.context = c;
  link.id;
  await write();
  setTab("Links");
}

async function link() {
  let name = await arg({
    placeholder: "Create a new link:",
    hint: "Enter a name to remember the link"
  });
  let url = await arg({
    placeholder: "URL:",
    hint: "Enter the URL"
  });
  let description = await arg({
    placeholder: "Enter a short description",
    hint: "Add emojis to make the description more meaningful"
  });

  let context = await textarea({
    placeholder:
      "Enter a more information if you need more context hit cmd + s to save",
    hint: "Add emojis to make the description more meaningful"
  });

  links.push({
    name,
    id: uuid(),
    url,
    description,
    context
  });
  await write();
  setTab("Links");
}

onTab("Links", async () => {
  while (true) {
    let link = await arg(
      "Open a link:",
      links.map((link) => {
        return {
          name: link.name,
          preview: async () =>
            setPreview(link.name, link.url, link.description, link.context),
          url: link.url,
          description: link.description,
          context: link.context,
          id: link.id
        };
      })
    );

    let t = _.find(links, link);
    await focusWindow(browser, "");
    try {
      await focusTab(t.url, browser);
      break;
    } catch (e) {
      await browse(t.url);
      break;
    }
  }
});

onTab("New Link", link);
onTab("Edit Link", editLink);

onTab("Remove Link", async () => {
  let link = await arg(
    "Remove todo:",
    links.map((link) => {
      return {
        name: link.name,
        preview: async () =>
          setPreview(link.name, link.url, link.description, link.context),
        url: link.url,
        description: link.description,
        context: link.context,
        id: link.id
      };
    })
  );

  _.remove(links, link);
  await write();
  setTab("Remove Link");
});

onTab("Export", async () => {
  let dir = await path(`~/Desktop`);
  let file = await arg("Export filename:");
  let json = JSON.stringify(links, null, 2);
  await writeFile(`${dir}/${file}.json`, json);
  setTab("Links");
});

onTab("Import", async () => {
  let dir = await path();
  // let file = await arg("Import filename:");
  let json = await readFile(`${dir}`);
  links = JSON.parse(json);
  await write();
  setTab("Links");
});
