import { Router } from "express"
import { AuthRoute } from "./auth/auth-route";

export class AppRoutes {


   public static routes = () => {
      const router = Router();

      router.use('/api/v1/auth', AuthRoute.route())

      return router;
   }

};