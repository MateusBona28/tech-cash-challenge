import AppDataSource from "../data-source";
import { Account } from "../entities/accounts.entity";
import { Transaction } from "../entities/transactions.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";
import { ITransactionCallback, ITransactionKeys, ITransactionRequest } from "../interfaces/transactions.interfaces";
import { postGeneric, validateDataToCreate } from "../utils/createGenerics";
import { getObjectOr404 } from "../utils/listGenerics";
import { patchGeneric } from "../utils/updateGenerics";


export const createTransactionService = async (data: ITransactionRequest, debitedUsername: string) => {

    const dataToValidate = {
        ...data
    }

    const validatedData = await validateDataToCreate(dataToValidate, ITransactionKeys)

    if (debitedUsername === validatedData.username){
        throw new AppError("you cant transfer to yourself");
    }

    const debitedAccount = await getObjectOr404(User, "username", debitedUsername, (instance: any) => {
        delete instance.password
    })
    
    if (debitedAccount.account.balance < validatedData.value){
        throw new AppError("you do not have this amount to transfer");
    }

    const valueAfterTransfer = {balance: parseFloat(debitedAccount.account.balance) - parseFloat(validatedData.value)}

    const patchedDebitedAccount = await patchGeneric(Account, validatedData.debitedAccount.id, valueAfterTransfer)

    validatedData.debitedAccount = patchedDebitedAccount

    const creditedAccount = await getObjectOr404(User, "username", validatedData.username, (instance: any) => {
        delete instance.password
    })

    validatedData.creditedAccount = creditedAccount.account

    const payload = {balance: parseFloat(creditedAccount.account.balance) + parseFloat(validatedData.value)}

    const patchedCreditedAccount = await patchGeneric(Account, creditedAccount.account.id, payload)

    delete validatedData.username

    validatedData.creditedAccount = patchedCreditedAccount

    const newTransaction = await postGeneric(Transaction, validatedData, (instance: any) => {

        delete validatedData.creditedAccount

    })

    return newTransaction

}
