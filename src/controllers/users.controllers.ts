import { Request, Response } from "express";


export const testRoute = (request: Request, response: Response) => {

    return response.json("teste")

}