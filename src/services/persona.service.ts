import { Persona } from '../db/models/persona.model';

export const getAllPersons = async ()=>{
    const persons = await Persona.findAll();
    return persons
}

