import {
    Contains,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { PersonaResponse } from "../../shared/interfaces/persona-response.interface";
export class PersonaDTO implements PersonaResponse {
  @IsEmail()
  @IsString()
  @Contains('@ufps.edu.co',{message:'No es un correo institucional válido'})
  correo_institucional!: string;

  @IsString({message:'Los nombres son obligatorios'})
  @MinLength(3)
  nombres!: string;

  @IsString({message:'Los apellidos son obligatorios'})
  @MinLength(3)
  apellidos!: string;

  @IsNumber()
  @IsPositive()
  cod_rol!: number;

  @IsString()
  @Length(7,8, {message:'Revise la cantidad de carcateres del código'})
  codigo!: string;

  @IsNumber()
  @IsOptional()
  cod_tipo_doc?: number;

  @IsOptional()
  @Length(8,12)
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
