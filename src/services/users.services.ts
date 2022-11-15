import { hash } from "bcryptjs";
import { Account } from "../entities/accounts.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";
import { IUserKeys, IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import { objectAlreadyExists, postGeneric, validateDataToCreate } from "../utils/genericCreate";



export const createUserService = async (data: IUserRequest) => {

    const newUserInfo = {...data}

    const validatedData = await validateDataToCreate(newUserInfo, IUserKeys, async (instance: any) => {

        if(instance.username.length < 3){
            throw new AppError("username property must be at least 3 letters long");
        }
    
        const regex = /^(?=.*\d)(?=.*[A-Z])[0-9A-Z]{8,}$/
    
        const passwordIsValid = regex.test(instance.password)
    
        if(!passwordIsValid){
            throw new AppError("password must contain at least 1 uppercase letter, a number and at least 8 digits");
        }
    
        const hashedPassword = await hash(instance.password, 10)
    
        instance.password = hashedPassword
    })

    const userAlreadyExists = await objectAlreadyExists(User, "username", validatedData.username)

    if(userAlreadyExists){
        throw new AppError("username already exists");
    }

    const account = await postGeneric(Account, {isValid: true})

    validatedData.account = account

    const newUser = await postGeneric(User, validatedData, (user: IUserResponse) => {

        delete user.password
        
    })

    return newUser

}