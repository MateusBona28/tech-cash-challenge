import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users.interfaces";
import { loginUserService } from "../services/session.services";


export const loginUserController = async (req: Request, res: Response) => {

    const userLogin: IUserLogin = req.body

    const token = await loginUserService(userLogin)

    return res.json({token})
}