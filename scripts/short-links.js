// Name: short links

/** @type {import("@johnlindquist/kit")} */

let { links, write } = await db({ links: [] });

let browser = await env("KIT_BROWSER");

onTab("Links", async () => {
  while (true) {
    let link = await arg("Toggle todo:", links);
    let t = _.find(links, link);
    await focusWindow(browser, "");
    try {
      await focusTab(t.url, browser);
      break;
    } catch (e) {
      await browse(t.url);
      break;
    }
    await write();
  }
});

onTab("New Link", async () => {
  let name = await arg("New link:");
  let url = await arg("URL:");
  links.push({ name, id: uuid(), url });
  await write();
  setTab("Links");
});

onTab("Remove Link", async () => {
  let link = await arg("Remove todo:", links);
  _.remove(links, link);
  await write();
  setTab("Todos");
});
