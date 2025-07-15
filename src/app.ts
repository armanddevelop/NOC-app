import { envs } from "./config/plugins/env.plugins";
import { ServerUp } from "./presentation/server";
const main = () => ServerUp.startServer();

(async () => {
  //main();
  //console.log("process.env", envs);
})();
