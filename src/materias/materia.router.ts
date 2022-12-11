import { BaseRouter } from "../shared/router/router";
import { MateriaController } from './controllers/materia.controller'
import { MateriaMiddleware } from './middlewares/materia.middleware'


export class MateriaRouter extends BaseRouter<
  MateriaController,
  MateriaMiddleware
> {
  constructor() {
    super(MateriaController, MateriaMiddleware);
  }

  routes(): void {
    this.router.get(
      '/materias',
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res)=> this.controller.getAllSubjects(req, res))

    this.router.get('/materia/:codigo', (req, res)=> this.controller.getOneCourse(req, res))
  }
}
