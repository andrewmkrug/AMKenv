// .kenv/kenvs/shared/scripts/tools-manager.ts
import "@johnlindquist/kit";
import { lookupCollections, lookupCollection } from "@iconify/json";
await npm("@iconify/types");
await npm("@iconify/json");
await npm("@iconify/utils");
var { collections, write } = await db("tools", { collections: [] });
var iconCollections = await lookupCollections();
var allIcons = [];
Object.keys(iconCollections).forEach(async (collection) => {
  log(collection);
  let collectionInfo = iconCollections[collection];
  log(collectionInfo);
  let icons = await lookupCollection(collection);
  Object.keys(icons).forEach(async (icon2) => {
    let iconInfo = icons[icon2];
    let iconUrl = `https://iconify.design/${collection}/${icon2}`;
    let i = {
      name: icon2,
      collection
    };
    allIcons.push(i);
  });
});
var icon = await arg("Find an icon", (input) => _.find(allIcons, input));
