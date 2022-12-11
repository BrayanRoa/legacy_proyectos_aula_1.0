import { TokenService } from "../../shared/services/token.service";

export class AuthService {
  private readonly tokenService: TokenService;
  constructor() {
    this.tokenService = new TokenService();
  }

  async generarJWT(correo:string){
    const info = this.tokenService.generateJwt(correo)
    return info
  }
}
