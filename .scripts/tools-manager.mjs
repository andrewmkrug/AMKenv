// scripts/tools-manager.ts
import "@johnlindquist/kit";
await npm("@iconify/json");
await npm("@iconify/utils");
var { collections, write } = await db("tools", { collections: [] });
