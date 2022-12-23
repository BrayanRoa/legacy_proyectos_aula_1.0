import { BaseRouter } from "../shared/router/router";
import { PersonaController } from "./controllers/persona.controller";
import { Request, Response } from "express";
import { PersonaMidlleware } from "./middlewares/persona.middleware";

export class PersonaRouter extends BaseRouter<
  PersonaController,
  PersonaMidlleware
> {
  constructor() {
    super(PersonaController, PersonaMidlleware);
  }

  routes(): void {
    //* 🔵 get all persons
    this.router.get(
      "/personas",
      (req: Request, res: Response, next) => this.middleware.validarJwt(req, res, next),
      (req: Request, res: Response) =>
      this.controller.getTeachers(req, res)
    );

    //* 🔵 get person by mail 
    this.router.get(
      "/persona/:correo", 
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res) => this.controller.getPersonById(req, res)
    );

    //* 🔵 create person (teacher and student)
    this.router.post(
      "/createPersona",
      (req, res, next) => this.middleware.personValidator(req, res, next),
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req: Request, res: Response) => this.controller.createUser(req, res)
    );

    //! 🛑 update person by email - Still need to update the image
    this.router.patch(
      "/updatePersona/:correo",
      (req, res, next) => this.middleware.updatePersonaValidator(req, res, next),
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res) => this.controller.updatePersona(req, res)
    );

    //* 🔵 register person in course and group
    this.router.post(
      "/persona/:materia/:grupo",
      (req, res, next) => [this.middleware.existGroupAndCourse(req, res, next)],
      (req, res) => this.controller.registerPersonInCourse(req, res)
    );

    //* 🔵 register list of person in course and group
    this.router.post(
      "/personas/:materia/:grupo",
      (req, res, next) => this.middleware.validarJwt(req, res, next),
      (req, res, next) => this.middleware.existeArchivo(req, res, next),
      (req, res, next) => this.middleware.existGroupAndCourse(req, res, next),
      (req, res) => this.controller.registerExcelOfPersonsInCourse(req, res)
    )

    //! 🛑👀 yet to finish
    this.router.delete("/deletePerson/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
  }
}
