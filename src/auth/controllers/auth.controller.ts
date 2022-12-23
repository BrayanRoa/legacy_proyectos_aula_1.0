import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http-response';
import { AuthService } from '../services/auth.service';
export class AuthController{

    private readonly httpResponse:HttpResponse;
    private readonly authService: AuthService
    constructor(){
        this.httpResponse = new HttpResponse()
        this.authService = new AuthService()
    }

    async login(req:Request, res:Response){
        const {correo} = req.params
        try {
            const auth = await this.authService.generarJWT(correo)
            this.httpResponse.Ok(res, auth)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }
}