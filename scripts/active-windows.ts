import "@johnlindquist/kit";

await npm("@jxa/run");
// await npm("@jxa/repl");
// await npm("@jxa/types");
await npm("@jxa/global-type");
// await npm("@jxa/sdef-to-dts");
import "@jxa/global-type"
// import "@jxa/types"
import { run } from "@jxa/run";


// let processes = Application("System Events").processes.every(p => {
//     return p.visible() && p.name() != "Finder";
// })

export const processes = () => {
    // This callback function is run as JXA
    return run(() => {
        const sys = Application("System Events").processes.every(p => {
            return p.visible() && p.name() != "Finder";
        })
        return sys
    });
};

let p = await processes()

Promise.resolve(p)
dev({ p })