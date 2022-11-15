import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import AppError from "../errors/AppError";


export const getUserFromTokenMiddleware = (request: Request, response: Response, next: NextFunction) => {

    const token = request.headers.authorization?.split(" ")[1]

    if(!token){
        throw new AppError("Invalid token", 401)
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error:any, decoded:any ) => {

        if(error){
            throw new AppError("invalid token", 401);
        }

        request.user = decoded.user

        next()
    
    })
}