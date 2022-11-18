import { Request, Response } from "express"
import { createTransactionService } from "../services/transactions.services"



export const createTransactionController = async (request: Request, response: Response) => {

    const debitedAccount = request.user

    const baseTransaction = {
        debitedAccount: debitedAccount.account,
        ...request.body
    }

    const newTransaction = await createTransactionService(baseTransaction, debitedAccount.username)

    return response.status(201).json(newTransaction)

}
