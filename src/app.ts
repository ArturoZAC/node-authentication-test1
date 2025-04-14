import { envs } from "./config";
import { AppRoutes } from "./presentation/app-routes";
import { AppServer } from "./presentation/app-server"

(() => {
  App()
})()


function App () {

  const server = new AppServer( envs.PORT , AppRoutes.routes() )
  server.start();

}