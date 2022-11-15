import AppDataSource from "../data-source"
import AppError from "../errors/AppError"


export const patchGeneric = async (model: any, id: string, updateData: any, callback?: Function) => {

    const modelRepository = AppDataSource.getRepository(model)

    const instance = await modelRepository.findOneBy({
        id: id
    })

    const updatedInstance = {
        ...instance,
        ...updateData
    }

    modelRepository.update(id=id, updatedInstance)

    if (callback) {
        callback(updatedInstance)
    }

    return updatedInstance

}
