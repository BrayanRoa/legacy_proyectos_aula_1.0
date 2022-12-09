import { NextFunction, Request, Response } from 'express';
import { PersonaService } from '../../personas/services/persona.service';
import { MailService } from '../../shared/mail/mail';
import { HttpResponse } from '../../shared/response/http-response';
export class AuthMiddleware{
    private readonly personService:PersonaService
    private readonly httpResponse:HttpResponse
    private readonly mailService:MailService
    constructor(){
        this.personService = new PersonaService()
        this.httpResponse = new HttpResponse()
        this.mailService = new MailService()
    }

    async existPerson(req:Request, res:Response, next:NextFunction){
        const { correo } = req.params
        const mailValido = await this.mailService.mailValido(correo)

        if(!mailValido){
            this.httpResponse.NotFound(res, `No es un correo institucional válido`)
        }
        const person = await this.personService.findPersonByCorreo(correo)
        if(!person){
            return this.httpResponse.NotFound(res, `No existe persona con correo ${correo}`)
        }
        next()
    }
}