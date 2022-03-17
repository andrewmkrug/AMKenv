// .kenv/kenvs/shared/scripts/active-windows.ts
import "@johnlindquist/kit";
import "@jxa/global-type";
import { run } from "@jxa/run";
await npm("@jxa/run");
await npm("@jxa/global-type");
var processes = () => {
  return run(() => {
    const sys = Application("System Events").processes.every((p2) => {
      return p2.visible() && p2.name() != "Finder";
    });
    return sys;
  });
};
var p = await processes();
Promise.resolve(p);
dev({ p });
export {
  processes
};
