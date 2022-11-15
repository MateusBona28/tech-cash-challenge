export interface ITransactionRequest {
    value?: number
    debitedAccount?: {}
    username?: string
}

export const ITransactionKeys = {
    value: 1,
    debitedAccount: {},
    username: "string"
}

export interface ITransactionResponse {
    id: string
    creadetAt: Date
    value: number
    debitedAccount: object
    creditedAccount: object
}

export interface ITransactionCallback {
    id: string
    creadetAt: Date
    value: number
    username: string
    password?: string
    debitedAccount: {
        id: string
        balance: number
    }
}