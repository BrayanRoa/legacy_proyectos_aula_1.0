import { IsString, MinLength, Length } from 'class-validator';

export class MateriaDTO{

    @IsString()
    @MinLength(2)
    nombre!:string;

    @IsString()
    @Length(7,8,{message:`El código debe tener entre 7 u 8 caracteres`})
    cod_asignatura!:string;
}