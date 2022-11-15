import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Account } from "../entities/accounts.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";
import { IUserKeys, IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import { objectAlreadyExists, postGeneric, validateDataToCreate } from "../utils/createGenerics";



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


export const listUserDetailService = async (user: any, userId: string) => {

    if (user.id === userId){
        
        const usersRepository = AppDataSource.getRepository(User)

        const filteredUser: any = await usersRepository.find({
            where: {
                id: user.id
            },
            relations: {
                account: {
                    creditedTransactions: true,
                    debitedTransactions: true
                }
            }
        })

        return filteredUser[0]

    }
    else{
        throw new AppError("you dont have permission to perform this action", 403);
    }
    
}


export const listUserDetailOrderedService = async (user: any, userId: string, order: string) => {

    const usersRepository = AppDataSource.getRepository(User)
    
    if (user.id === userId && order.toLowerCase() === "asc"){

        const filteredUser: any = await usersRepository.find({
            where: {
                id: user.id
            },
            relations: {
                account: {
                    creditedTransactions: true,
                    debitedTransactions: true
                }
            },
            order: {
                account: {
                    creditedTransactions: {
                        createdAt: "ASC"
                    },
                    debitedTransactions: {
                        createdAt: "ASC"
                    }
                }
            }
        })

        return filteredUser[0]

    }
    else if (user.id === userId && order.toLowerCase() === "desc") {

        const filteredUser: any = await usersRepository.find({
            where: {
                id: user.id
            },
            relations: {
                account: {
                    creditedTransactions: true,
                    debitedTransactions: true
                }
            },
            order: {
                account: {
                    creditedTransactions: {
                        createdAt: "DESC"
                    },
                    debitedTransactions: {
                        createdAt: "DESC"
                    }
                }
            }
        })

        return filteredUser[0]

    }
    else{
        throw new AppError("you dont have permission to perform this action", 403);
    }
}


export const listUserDetailCashInService = async (user: any, userId: string) => {


    const usersRepository = AppDataSource.getRepository(User)
    
    if (user.id === userId){

        const filteredUser: any = await usersRepository.find({
            where: {
                id: user.id
            },
            relations: {
                account: {
                    creditedTransactions: true
                }
            }
        })

        return filteredUser[0]

    }
    else{
        throw new AppError("you dont have permission to perform this action", 403);
    }

}


export const listUserDetailCashOutService = async (user: any, userId: string) => {


    const usersRepository = AppDataSource.getRepository(User)
    
    if (user.id === userId){

        const filteredUser: any = await usersRepository.find({
            where: {
                id: user.id
            },
            relations: {
                account: {
                    debitedTransactions: true
                }
            }
        })

        return filteredUser[0]

    }
    else{
        throw new AppError("you dont have permission to perform this action", 403);
    }

}

