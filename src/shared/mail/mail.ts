import sgMail from "@sendgrid/mail";
import { PersonaResponse } from "../interfaces/persona-response.interface";
// import { Asignatura } from '../../db/models/materia.model';
import { MateriaService } from "../../materias/services/materia.service";
import { Materia } from "../interfaces/materia-response.interface";

sgMail.setApiKey(process.env.API_KEY_SEND_GRID ?? "");

export default sgMail;

export class Mail {
  private readonly materiaService: MateriaService;

  constructor() {
    this.materiaService = new MateriaService();
  }

  async sendMails(persona: PersonaResponse, materia: string, grupo: string) {
    const info: Materia | null = await this.materiaService.findCourseAndGroup(
      materia,
      grupo
    );
    const msg = {
      to: persona.correo_institucional, // Change to your recipient
      from: process.env.EMAIL!, // Change to your verified sender
      subject: "Ingeniería De Sistemas - UFPS",
      text: `Hola ${persona.nombres} ${persona.apellidos}`,
      html: `
      <body style="width: 800px">
        <div style="background-color: #d12f50; width: 100%; padding: 3rem 0;">
          <div style="text-align: center; background-color: #ffffff; margin: 0 auto; width: 80%; border-radius: 8px;">
              <img style="margin-top: 3rem; width: 190px"
                  src="https://ww2.ufps.edu.co/public/archivos/elementos_corporativos/logoufps.png" alt="logo">
              <p style="margin: 1rem 0; font-size: 25px;">Bienvenido a la materia - ${info?.nombre.toUpperCase()}</p>
              <p style="color: #424242; font-size: 15px">Has sido inscrito en el grupo ${info?.grupos?.[0].nombre?.toUpperCase()} de la materia ${info?.nombre.toUpperCase()}<br>Puedes ingresar a la plataforma dando click en el siguiente botón.
              </p>
              <div style="margin: 2rem auto; width: 120px; background-color: #4f46e5; padding: 8px; border-radius: 6px; ">
                  <a style="color: #ffffff; text-decoration: none" href="https://divisist2.ufps.edu.co/">Continuar</a>
              </div>
              <div style="width: 100%; border-top: 2px solid #a5b4fc; padding: 1rem 0">
                  <p>Copyright © 2022 Universidad Francisco De Paula Santander <br> Todos los derechos reservados.</p>
              </div>
          </div>
      </div>
    </body>`,
    };

    await sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        console.error(error);
      });

    return msg;
  }
}
