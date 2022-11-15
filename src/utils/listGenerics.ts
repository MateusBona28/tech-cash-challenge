import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";


export const getObjectOr404 = async (model: any, objectKey: any, objectKeyValue: any , callback?: Function) => {

    const modelRepository = AppDataSource.getRepository(model)

    const instances = await modelRepository.find()

    const instance = instances.find(objectInstance => objectInstance[`${objectKey}`] === objectKeyValue)

    if (!instance && model === User) {
        throw new AppError("invalid username", 404);
    }

    if (!instance) {
        throw new AppError("Not found", 404);
    }

    if (callback) {
        callback(instance)
    }

    return instance

}