import AppDataSource from "../data-source"
import AppError from "../errors/AppError"
import { hash } from "bcryptjs";
import { IUserRequest } from "../interfaces/users.interfaces";


export const postGeneric = async (model: any, instance: any, callback?: any) => {

    if (!instance.isValid) {
        throw new AppError("antes de criar um novo usuário, utilize a função validateDataToCreate => validateDataToCreate(instanceToValidate, IKeys) ", 400)
    }

    delete instance.isValid

    const modelRepository = AppDataSource.getRepository(model)

    modelRepository.create(instance)
    const data = await modelRepository.save(instance)

    if (callback) {
        callback(data)
    }

    return data

}

const validateInstanceTypes = async (instance: any, instanceToValidate: any) => {

    const instanceKeys = Object.keys(instance)

    if (instance.isValid) {

        delete instance.isValid

        for (let i = 0; i <= instanceKeys.length; i++){
            const key = instanceKeys[i]
            if (typeof instance[key] !== typeof instanceToValidate[key]){
                throw new AppError(`the type of key ${key} need to be ${typeof instanceToValidate[key]}`, 400);
            }
        }
    }

    instance.isValid = true

    return instance

}

const validateInstanceKeys = async (instance: any, instanceToValidate: any) => {

    const instanceKeys = Object.keys(instance)
    const keysToValidate = Object.keys(instanceToValidate)

    const keysValidated = []
    const missingKeys = []

    for (let i = 0; i <= keysToValidate.length; i++){
        const keyToValidate = keysToValidate[i]
        let keyExists = false

        for (let j = 0; j <= instanceKeys.length; j++){
            const key = instanceKeys[j]

            if (key === keyToValidate) {
                keysValidated.push(keyToValidate)
                keyExists = true
            }
        }

        if (!keyExists) {
            missingKeys.push(keyToValidate)
        }
    }

    if (missingKeys.length > 0){
        throw new AppError(`missing ${missingKeys} keys in request`, 400);
    }

    instance.isValid = true

    return instance

}


export const objectAlreadyExists = async (model: any, instanceKey: any, instanceKeyValue: any) => {

    const modelRepository = AppDataSource.getRepository(model)

    const instances = await modelRepository.find()

    const instanceAlreadyExists = instances.find(object => object[`${instanceKey}`] === instanceKeyValue)

    if (instanceAlreadyExists) {
        throw new AppError(`${instanceKey} already exists`, 400);
    }

    return false
}


export const validateDataToCreate = async (instance: any, interfaceToValidate: any, callback?: any) => {

    validateInstanceKeys(instance, interfaceToValidate)
    validateInstanceTypes(instance, interfaceToValidate)

    if (callback) {
        await callback(instance)
    }

    return instance

}
