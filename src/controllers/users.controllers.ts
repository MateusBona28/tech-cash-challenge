import { Request, Response } from "express";
import { createUserService } from "../services/users.services";


export const testRoute = (request: Request, response: Response) => {

    return response.json("teste")

}

export const createUserController = async (request: Request, response: Response) => {

    const newUser = await createUserService(request.body)

    return response.json(newUser).status(201)

}