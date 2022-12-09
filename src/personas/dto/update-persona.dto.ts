import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdatePersona {
  @IsOptional()
  @Length(8, 12,{message:`El documento debe tener entre 8 y 12 números`})
  documento?: string;

  @IsOptional()
  celular?: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @IsBoolean()
  perfil_completado!: boolean;
}
