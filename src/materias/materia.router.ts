import { BaseRouter } from "../shared/router/router";
import { MateriaController } from "./controllers/materia.controller";
import { MateriaMiddleware } from "./middlewares/materia.middleware";

export class MateriaRouter extends BaseRouter<
  MateriaController,
  MateriaMiddleware
> {
  constructor() {
    super(MateriaController, MateriaMiddleware);
  }

  routes(): void {
    this.router.get(
      "/materias",
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res) => this.controller.getAllSubjects(req, res)
    );

    this.router.get(
      "/materia/:codigo",
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res) => this.controller.getOneSubject(req, res)
    );

    this.router.post(
      "/createMateria",
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res, next) => this.middleware.materiaValidator(req, res, next),
      (req, res) => this.controller.createSubject(req, res));

    this.router.post(
      '/createGrupo/:materia',
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res) => this.controller.createGruopOfSubject(req, res))

    this.router.patch("/updateMateria/:codigo");

    //* TODO: EN ESTA SE DEBE REVISAR QUE NO TENGA GRUPOS ACTIVOS
    this.router.delete('/deleteMateria/:codigo')
  }
}
