import { Router } from "express"
import { AuthController } from "./auth-controller";
import { AuthService } from "../services/auth.service";

export class AuthRoute {
                    
  public static route = () => {
    const router = Router();
    const authService = new AuthService();
    const authController = new AuthController( authService );           

    router.post('/login', authController.loginAuth );
    router.post('/register', authController.registerAuth );                  
    router.get('/renew', authController.renewAuth );

    return router;
  }
};