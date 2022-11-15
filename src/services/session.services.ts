import { compare } from "bcryptjs";
import jwt from "jsonwebtoken"
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";
import { IUserLogin } from "../interfaces/users.interfaces";


export const loginUserService = async ({ username, password }: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const userToSignIn = users.find((user: any) => user.username === username)

    if(!userToSignIn){
        throw new AppError("invalid username", 403);
    }

    const passwordIsValid = await compare(password, userToSignIn.password)

    if(!passwordIsValid){
        throw new AppError("invalid username or password", 403);
    }

    const token = jwt.sign(
        {
            user: userToSignIn
        },
        process.env.SECRET_KEY as string, 
        {
            expiresIn: "24h",
            subject: userToSignIn.id
        }
    )

    return token

}