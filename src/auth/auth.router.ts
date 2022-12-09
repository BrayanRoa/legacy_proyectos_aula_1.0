import { BaseRouter } from "../shared/router/router";
import { AuthController } from "./controllers/auth.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(AuthController, AuthMiddleware);
  }

  routes(): void {
      this.router.post(
        '/login/:correo',
        (req, res, next) => [this.middleware.existPerson(req, res, next)],
        (req, res)=> this.controller.login(req, res))
  }
}
