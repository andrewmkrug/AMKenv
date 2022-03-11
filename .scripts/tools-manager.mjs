// scripts/tools-manager.ts
import "@johnlindquist/kit";
await npm("@iconify/json");
await npm("@iconify/utils");
var { collections, write } = await db("tools", { collections: [] });
var cJson = `${kenvPath("node_modules")}/@iconify/json/collections.json`;
log(cJson);
var iconCollections = await readJson(cJson);
for (let collection of iconCollections) {
  log(collection.name);
}
await log(iconCollections.length);
