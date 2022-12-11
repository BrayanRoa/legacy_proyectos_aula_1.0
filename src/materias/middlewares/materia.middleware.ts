// import { HttpResponse } from '../../shared/response/http-response';
import { BaseMiddleware } from '../../shared/middlewares/base.middleware';
import { HttpResponse } from '../../shared/response/http-response';
import { TokenService } from '../../shared/services/token.service';

export class MateriaMiddleware extends BaseMiddleware{

    constructor(
        readonly httpResponse:HttpResponse = new HttpResponse(),
        readonly tokenService:TokenService = new TokenService()
    ){
        super(httpResponse, tokenService)
    }

    materiaValidator(){
        // this.httpResponse.Ok()
    }

}