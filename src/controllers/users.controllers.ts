import { Request, Response } from "express";
import { createUserService, listUserDetailCashInService, listUserDetailCashOutService, listUserDetailOrderedService, listUserDetailService } from "../services/users.services";


export const createUserController = async (request: Request, response: Response) => {

    const newUser = await createUserService(request.body)

    return response.json(newUser).status(201)

}


export const listUserDetailController = async (request: Request, response: Response) => {

    const userId = request.params.id

    const user = await listUserDetailService(request.user, userId)

    delete user.password

    return response.json(user)

}


export const listUserDetailOrderedController = async (request:Request, response: Response) => {

    const userId = request.params.id

    const user = await listUserDetailOrderedService(request.user, userId, request.params.order)

    delete user.password

    return response.json(user)

}


export const listUserDetailCashInController = async (request: Request, response: Response) => {

    const userId = request.params.id

    const user = await listUserDetailCashInService(request.user, userId)

    delete user.password

    return response.json(user)

}

export const listUserDetailCashOutController = async (request: Request, response: Response) => {

    const userId = request.params.id

    const user = await listUserDetailCashOutService(request.user, userId)

    delete user.password

    return response.json(user)
    
}
