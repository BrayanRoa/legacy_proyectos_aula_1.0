import { Request, Response } from "express";
import { getAllPersons } from "../services/persona.service";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const persons = await getAllPersons();
    res.status(200).json({
      persons,
    });
  } catch (error) {
    console.log(error);
  }
};

export const findByID = async (_req: Request, _res: Response) => {
  return undefined;
};

export const create = async (_req: Request, _res: Response) => {
  return undefined;
};

export const update = async (_req: Request, _res: Response) => {
  return undefined;
};

export const remove = async (_req: Request, _res: Response) => {
  return undefined;
};
