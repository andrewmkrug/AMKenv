// Name: watcher-amkenv
// schedule: */10 * * * *
import "@johnlindquist/kit";

let kenvs = await kit.core.getKenvs();
log(kenvs);
